import * as Yup from 'yup';
import { catalogName_required } from '../messages/messages';

export const catalogSchema = Yup.object({
    catalogName : Yup.string().required(catalogName_required)
})