import { services } from '../../src/services';
import { generate } from './generate';

const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'checkbox',
            message: 'Select service for its DTO typescript generating',
            name: 'service',
            choices: services.map(item => { return { "name": item.name }}),
            validate: function (answer: any) {
                if (answer.length < 1) {
                    return 'You must choose at least one service.';
                }

                return true;
            },
        },
    ])
    .then((answers: any) => {

        const docs = answers.service.map((key: string) => {
            return services.find(service => service.name === key).openApi
        });

        generate(docs);

    });