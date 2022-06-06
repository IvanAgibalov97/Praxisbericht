import { expect } from "chai";

type TDefaultUseCaseNames = "nameOfUseCase";
interface IUseCase {}
type TEventInfo = {
    name: string;
    count: number;
    queue: string[];
};

class MyOCPPTestFramework {
    public readonly interactors: {
        interactor_1: () => void;
        interactor_2: () => void;
    } = {
        interactor_1: () => {},
        interactor_2: () => {},
    };

    constructor(networkConfig: { port: number; host: string }) {
        return;
    }

    public async start(): Promise<void> {
        return;
    }
    public async stop(): Promise<void> {
        return;
    }
    public async waitOfEvent(name: string): Promise<TEventInfo> {
        return {
            name: "someEvent",
            count: 1,
            queue: [],
        };
    }
    public async waitOfNextEvent(): Promise<TEventInfo> {
        return {
            name: "someEvent",
            count: 1,
            queue: [],
        };
    }
    public addUseCase(useCase: IUseCase) {
        return;
    }
    public rewriteUseCase(name: TDefaultUseCaseNames, useCase: IUseCase) {
        return;
    }
}

describe("example test", () => {
    let testOcppInstanz: MyOCPPTestFramework;
    let counter = 0;
    async function beforeOCPPServer(fn: Mocha.Func) {
        console.log("before before", ++counter);
        await before(fn);
        console.log("after before", ++counter);
    }

    beforeOCPPServer(async () => {
        console.log("in before", ++counter);
        // 1. Create test server instanz
        testOcppInstanz = new MyOCPPTestFramework({ host: "https://127.0.0.1", port: 8080 });

        //2.1. rewrite behavior of server
        testOcppInstanz.rewriteUseCase("nameOfUseCase", {});
        //2.2. add behavior to server
        testOcppInstanz.addUseCase({});

        //2.3. parametrize the behavior
        testOcppInstanz.interactors.interactor_1();
        testOcppInstanz.interactors.interactor_2();

        // 3. start server
        await testOcppInstanz.start();
        return;
    });
    it("test 1", async () => {
        // 5. wait until test is done
        const res = await testOcppInstanz.waitOfEvent("BootNotification");

        // 4. and 6. set the requirement test is valid, validate the result
        expect(res.name).equal("BootNotification");
    });
    it("test 2", async () => {
        // 5. wait until test is done
        const res = await testOcppInstanz.waitOfNextEvent();

        // 4. and 6. set the requirement test is valid, validate the result
        expect(res.name).equal("Heartbeat");
    });
    after(async () => {
        // 7. stop server
        testOcppInstanz.stop();
        return;
    });
});
