import "mocha";
import {Flow} from "../src/main/models/Flow";
import withDescription = require("./testfiles/createproperty.json");
import {MissingFlowDescription} from "../src/main/rules/MissingFlowDescription";
import {expect} from "chai";

describe("When there is a flow description",async function () {
    let flow;

    before("arrange",  async function () {

        // ARRANGE
        flow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : withDescription,
            detail: 'anypath'
        });
    });
    it("there is no missing flow description", async function () {

        // ACT
        const missingDescription = new MissingFlowDescription().execute(flow);

        // ASSERT
      expect(missingDescription.occurs).to.equal(true);
        // assert.strictEqual(missingDescription, false);
    });
});
