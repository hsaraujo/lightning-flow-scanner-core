import {RuleDefinitions} from '../ruledefinitions/RuleDefinitions';
import {RuleInfo} from '../ruledefinitions/RuleInfo';
import {FlowElement} from './FlowElement';
import {FlowVariable} from './FlowVariable';

export class RuleResult {

  constructor(ruleName: string, type: string, occurs : boolean, details?: (FlowElement[] | FlowVariable[])) {

    this.occurs = occurs;
    if(details){
      this.details = details;
    }
    this.ruleName = ruleName;
    this.type = type;

    for (const ruleDefinitionName in RuleDefinitions) {
      if (ruleDefinitionName === ruleName) {
        const rule = RuleInfo(RuleDefinitions[ruleDefinitionName]);
        this.ruleDescription = rule.text;
        this.ruleLabel = rule.label;
      }
    }
  }

  public details?: (FlowElement[] | FlowVariable[]);
  public occurs: boolean;

  public ruleDescription: string;
  public ruleLabel: string;
  public ruleName: string;
  public type: string;

}
