import dtsGenerator, { parseSchema, ts } from 'dtsgenerator';
import nodeFetch from 'node-fetch';
import { services } from '../../src/services';

const fs = require('fs');

const batchSize = 3;

const forEach = async (array: any, callback: any) => {
    /* tslint:disable-next-line */
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

const splitBatch = (arr: any, batchSize: any) => {
    return arr.reduce((accumulator: any, element: any, index: number) => {
        const batchIndex = Math.floor(index / batchSize);
        if (Array.isArray(accumulator[batchIndex])) {
            accumulator[batchIndex].push(element);
        } else {
            accumulator.push([element]);
        }
        return accumulator;
    }, []);
};

export const generate = (docs: string[]) => {

    const batches = splitBatch(docs, batchSize);

    const capitalize = (text: string): string =>
        `${text[0].toUpperCase()}${text.substring(1)}`;

    const sendRequest = (url: string, serviceName: string) => {
        const nameSpace = `${capitalize(serviceName)}Raw`;

        return new Promise(async (resolve) => {
            try {
                const response = await nodeFetch(url).then(res => res.json());

                const generatedContent = await dtsGenerator({
                    contents: [parseSchema(response)],
                    config: {
                        target: ts.ScriptTarget.ES2019,
                        plugins: {
                            "@dtsgenerator/replace-namespace": {
                                map: [
                                    {
                                        "from": ["Paths"],
                                        "to": [`${nameSpace}Paths`]
                                    },
                                    {
                                        "from": ["Components"],
                                        "to": [nameSpace]
                                    }
                                ]
                            }
                        }
                    }
                });

                fs.writeFile(
                    `src/generated-dto/${serviceName}.d.ts`,
                    `/* eslint-disable */\n${generatedContent}`,
                    { flag: 'w' },
                    (err?: string) => {
                        if (err) {
                            return console.log(err);
                        }
                        console.log(`- the types for ${serviceName} are generated.`);
                    },
                );

                resolve({ url, status: response.status });
            } catch (error) {
                resolve({ url, status: 500 });
            }
        });
    };

    console.group(
        'Autogenerating types for all raw responses of our used services',
    );

    (async () => {
        await forEach(batches, async (batch: any, i: number) => {
            await Promise.all(
                batch.map(async (url: string) => {
                    const name = services.find(item => item.openApi).name;
                    return await sendRequest(url, name);
                }),
            );
        });
    })();

    console.groupEnd();

};