import "mocha"
import { assert } from "chai"

import { Event } from "../../brigadier/src/events"

import { Job, Container, JobHost } from "../src/brigadier"

describe("jobs", () => {

  describe("Job", () => {
    describe("#constructor", () => {
      const event: Event = {
        id: "123456789",
        project: {
          id: "manhattan",
          secrets: {}
        },
        source: "foo",
        type: "bar",
        worker: {
          apiAddress: "",
          apiToken: "",
          configFilesDirectory: "",
          defaultConfigFiles: {}
        }
      }
      const job = new Job("my-name", "debian:latest", event)
      it("initializes fields properly", () => {
        assert.equal(job.name, "my-name")
        assert.deepEqual(new Container("debian:latest"), job.primaryContainer)
        assert.deepEqual({}, job.sidecarContainers)
        assert.equal(1000 * 60 * 15, job.timeout)
        assert.deepEqual(new JobHost(), job.host)
        assert.isDefined(job.logger)
      })
    })
  })

})