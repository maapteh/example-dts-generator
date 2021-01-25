import { services } from '../../src/services';
import { generate } from './generate';

generate(services.map(item => item.openApi));