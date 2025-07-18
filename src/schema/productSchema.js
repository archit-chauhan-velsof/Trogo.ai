import * as Yup from 'yup';
import { price_digit, price_required, productTitle_required, sku_required, year_digit, year_required } from '../messages/messages';

export const productSchema = Yup.object({
    title: Yup.string().required(productTitle_required),
    sku: Yup.string().required(sku_required),
    price:Yup.number(price_digit).positive(price_digit).required(price_required),
    year:Yup.number(year_digit).positive(year_digit).required(year_required),
})