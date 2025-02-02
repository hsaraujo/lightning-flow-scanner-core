import {IRuleDefinition} from '../interfaces/IRuleDefinition';
import {Flow} from '../models/Flow';
import {FlowElement} from '../models/FlowElement';
import {FlowVariable} from '../models/FlowVariable';
import {RuleResult} from '../models/RuleResult';
import {RuleDefinitions} from '../ruledefinitions/RuleDefinitions';
import {RuleCommon} from "./RuleCommon";

export class UnusedVariables extends RuleCommon implements IRuleDefinition{

  constructor() {
    super(RuleDefinitions.UnusedVariables);
  }

  public execute(flow: Flow) : RuleResult {
    const unusedVariables: FlowVariable[] = [];
    for (const variable of flow.nodes.filter(node => node instanceof FlowVariable) as FlowVariable[]) {
      // first check if any inside of flow elements
      const variableName = variable.name;
      if ([...JSON.stringify(flow.nodes.filter(node => node instanceof FlowElement)).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index).length === 0) {
        // if none found check in other flow variables
        const insideCounter = [...JSON.stringify(variable).matchAll(new RegExp(variable.name, 'gi'))].map(a => a.index);
        const variableUsage = [...JSON.stringify(flow.nodes.filter(node => node instanceof FlowVariable)).matchAll(new RegExp(variableName, 'gi'))].map(a => a.index);
        if (variableUsage.length === insideCounter.length) {
          unusedVariables.push(variable);
        }
      }
    }
    return new RuleResult('UnusedVariables', 'pattern', unusedVariables.length > 0, unusedVariables);
  }

}
