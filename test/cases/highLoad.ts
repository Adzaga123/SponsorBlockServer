import sinon from "sinon";
import { db } from "../../src/databases/databases";
import assert from "assert";
import { client } from "../utils/httpClient";
client.defaults.validateStatus = (status) => status < 600;

describe("High load test", () => {
    before(() => {
        sinon.stub(db, "highLoad").returns(true);
    });

    after(() => {
        sinon.restore();
    });

    it("Should return 503 on getTopUsers", async () => {
        await client.get("/api/getTopUsers?sortType=0")
            .then(res => {
                assert.strictEqual(res.status, 503);
            });
    });

    it("Should return 503 on getTopCategoryUsers", async () => {
        await client.get("/api/getTopCategoryUsers?sortType=0&category=sponsor")
            .then(res => {
                assert.strictEqual(res.status, 503);
            });
    });

    it("Should return 0 on getTotalStats", async () => {
        await client.get("/api/getTotalStats")
            .then(res => {
                assert.strictEqual(res.status, 200);
            });
    });
});
