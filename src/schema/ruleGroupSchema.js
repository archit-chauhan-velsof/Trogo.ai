import * as Yup from 'yup';
import { ruleGroupName_required } from '../messages/messages';

export const newRuleGroupSchema = Yup.object({
    groupName : Yup.string().required(ruleGroupName_required)
})