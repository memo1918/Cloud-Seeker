import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "my-component, MyComponent",
    template: `
    <div class="bg-white flex flex-col">
      <div
        class="items-stretch bg-fuchsia-50 self-stretch flex w-full justify-between gap-3.5 pl-14 pr-3 py-5 max-md:max-w-full max-md:flex-wrap max-md:pl-5"
      >
        <div
          class="text-zinc-900 text-2xl leading-7 grow shrink basis-auto max-md:max-w-full"
        >
          Cloud-Domination-Tool
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ed1ccb5-115f-4fd3-a550-e2d192d0e9b0?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
          class="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
        />
      </div>
      <div
        class="text-gray-100 text-sm leading-5 tracking-wide whitespace-nowrap justify-center items-stretch rounded bg-zinc-800 z-[1] w-[200px] max-w-full mr-3 -mt-3 px-2 py-1 max-md:mr-2.5"
      >
        View your configuration here
      </div>
      <div class="self-stretch ml-3 mr-3 mb-5 max-md:max-w-full max-md:mr-2.5">
        <div
          class="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0"
        >
          <div
            class="flex flex-col items-stretch w-[26%] max-md:w-full max-md:ml-0"
          >
            <div
              class="items-start bg-violet-50 flex w-full flex-col mx-auto pl-3 pt-8 pb-20 rounded-2xl max-md:mt-3"
            >
              <div
                class="text-zinc-700 text-sm font-medium leading-5 tracking-normal whitespace-nowrap ml-4 self-start max-md:ml-2.5"
              >
                CPU
              </div>
              <div
                class="self-stretch flex items-stretch justify-between gap-5 mt-5 pr-3"
              >
                <div
                  class="items-stretch flex grow basis-[0%] flex-col rounded"
                >
                  <div
                    class="items-center bg-zinc-200 flex w-full flex-col py-0.5 rounded"
                  >
                    <div
                      class="items-stretch flex w-[132px] max-w-full justify-between gap-5 py-1 rounded"
                    >
                      <div
                        class="justify-center items-stretch flex grow basis-[0%] flex-col"
                      >
                        <div
                          class="text-zinc-700 text-xs leading-4 whitespace-nowrap"
                        >
                          from
                        </div>
                        <div
                          class="text-zinc-900 text-base leading-6 tracking-wide whitespace-nowrap"
                        >
                          4 Cores
                        </div>
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b4494f1-1f00-4baf-aba4-8b968ffb6344?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                        class="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                      />
                    </div>
                    <div class="bg-zinc-700 self-stretch shrink-0 h-px"></div>
                  </div>
                </div>
                <div
                  class="items-stretch flex grow basis-[0%] flex-col rounded"
                >
                  <div class="bg-zinc-200 flex flex-col pt-2 rounded">
                    <div
                      class="text-zinc-700 text-xs leading-4 whitespace-nowrap ml-4 max-md:ml-2.5"
                    >
                      to
                    </div>
                    <div
                      class="bg-zinc-700 self-stretch shrink-0 h-px mt-8"
                    ></div>
                  </div>
                </div>
              </div>
              <img
                loading="lazy"
                srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/625a37b8-0f4a-46b6-983a-deed58565133?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/625a37b8-0f4a-46b6-983a-deed58565133?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/625a37b8-0f4a-46b6-983a-deed58565133?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/625a37b8-0f4a-46b6-983a-deed58565133?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/625a37b8-0f4a-46b6-983a-deed58565133?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/625a37b8-0f4a-46b6-983a-deed58565133?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/625a37b8-0f4a-46b6-983a-deed58565133?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/625a37b8-0f4a-46b6-983a-deed58565133?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                class="aspect-[7.42] object-contain object-center w-full justify-center items-center overflow-hidden self-stretch"
              />
              <div
                class="text-zinc-700 text-sm font-medium leading-5 tracking-normal whitespace-nowrap ml-4 mt-4 self-start max-md:ml-2.5"
              >
                Memory
              </div>
              <div
                class="self-stretch flex items-stretch justify-between gap-5 mt-5 pr-3"
              >
                <div
                  class="items-stretch flex grow basis-[0%] flex-col rounded"
                >
                  <div
                    class="items-center bg-zinc-200 flex w-full flex-col py-0.5 rounded"
                  >
                    <div
                      class="items-stretch flex w-[132px] max-w-full justify-between gap-5 py-1 rounded"
                    >
                      <div
                        class="justify-center items-stretch flex grow basis-[0%] flex-col"
                      >
                        <div
                          class="text-zinc-700 text-xs leading-4 whitespace-nowrap"
                        >
                          from
                        </div>
                        <div
                          class="text-zinc-900 text-base leading-6 tracking-wide whitespace-nowrap"
                        >
                          32 GB
                        </div>
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/31f42550-a9ba-40dc-85cc-42220b5fd8a3?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                        class="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
                      />
                    </div>
                    <div class="bg-zinc-700 self-stretch shrink-0 h-px"></div>
                  </div>
                </div>
                <div
                  class="items-stretch flex grow basis-[0%] flex-col rounded"
                >
                  <div class="bg-zinc-200 flex flex-col pt-2 rounded">
                    <div
                      class="justify-center items-stretch flex w-[55px] max-w-full flex-col ml-4 max-md:ml-2.5"
                    >
                      <div
                        class="text-zinc-700 text-xs leading-4 whitespace-nowrap"
                      >
                        to
                      </div>
                      <div
                        class="text-zinc-900 text-base leading-6 tracking-wide whitespace-nowrap"
                      >
                        128 GB
                      </div>
                    </div>
                    <div
                      class="bg-zinc-700 self-stretch shrink-0 h-px mt-2"
                    ></div>
                  </div>
                </div>
              </div>
              <div
                class="self-stretch flex items-stretch justify-between gap-0 pr-5"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0b7b640-709e-42a8-9fb5-58fea2f85c98?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                  class="aspect-[3.98] object-contain object-center w-[191px] justify-center items-center overflow-hidden shrink-0 max-w-full"
                />
                <div
                  class="justify-center items-stretch flex grow basis-[0%] flex-col mt-3.5 self-start"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea738152-dc03-4d3e-9019-ef18c64d4d50?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                    class="aspect-[9.63] object-contain object-center w-[183px] overflow-hidden"
                  />
                </div>
              </div>
              <div
                class="text-zinc-700 text-sm font-medium leading-5 tracking-normal whitespace-nowrap ml-4 mt-4 self-start max-md:ml-2.5"
              >
                OS
              </div>
              <div
                class="items-stretch self-stretch flex flex-col mt-5 pl-4 pr-6 py-2 max-md:pr-5"
              >
                <div class="items-stretch flex justify-between gap-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/975182ea-606e-4d96-871b-d7c393dc2c97?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                    class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                  />
                  <div
                    class="text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto"
                  >
                    Arch
                  </div>
                </div>
                <div class="items-stretch flex justify-between gap-4 mt-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3196f371-e2e9-42a1-bd0b-7c1a1acf5eb9?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                    class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                  />
                  <div
                    class="text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto"
                  >
                    Fedora
                  </div>
                </div>
                <div class="items-stretch flex justify-between gap-4 mt-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f26fe4ba-1f7a-40fe-a89e-faeda1eb7bb4?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                    class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                  />
                  <div
                    class="text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto"
                  >
                    Ubuntu
                  </div>
                </div>
                <div class="items-stretch flex justify-between gap-4 mt-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcd65683-c7a9-42e5-a6c4-51e6cbef7304?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                    class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                  />
                  <div
                    class="text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto"
                  >
                    RedHat
                  </div>
                </div>
                <div class="items-stretch flex justify-between gap-4 mt-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/59b4b254-5652-4d17-9d8f-ad4f284494c1?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                    class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                  />
                  <div
                    class="text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto"
                  >
                    Windows
                  </div>
                </div>
                <div class="items-stretch flex justify-between gap-4 mt-4">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a14ab71-7bd4-4f8a-8b48-0ef2357a877d?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                    class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                  />
                  <div
                    class="text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto"
                  >
                    None
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col items-stretch w-[74%] ml-5 max-md:w-full max-md:ml-0"
          >
            <div class="flex grow flex-col max-md:max-w-full max-md:mt-3">
              <img
                loading="lazy"
                srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/06fdcaf4-094e-4feb-824d-87789127fdaa?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/06fdcaf4-094e-4feb-824d-87789127fdaa?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/06fdcaf4-094e-4feb-824d-87789127fdaa?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/06fdcaf4-094e-4feb-824d-87789127fdaa?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/06fdcaf4-094e-4feb-824d-87789127fdaa?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/06fdcaf4-094e-4feb-824d-87789127fdaa?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/06fdcaf4-094e-4feb-824d-87789127fdaa?apiKey=44984f5ef77a45b0b75fe523b4299e21&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/06fdcaf4-094e-4feb-824d-87789127fdaa?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                class="aspect-[10.42] object-contain object-center w-[698px] justify-end items-center overflow-hidden max-w-full self-start"
              />
              <div
                class="flex w-[492px] max-w-full items-stretch gap-2.5 mt-5 px-5 self-start max-md:flex-wrap max-md:justify-center"
              >
                <div
                  class="justify-center bg-purple-200 flex grow basis-[0%] flex-col px-2 py-1.5 rounded-lg"
                >
                  <div class="justify-center items-stretch flex gap-2">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3bb9cb9-ac7e-498b-96f5-b6c2b80f8645?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                      class="aspect-square object-contain object-center w-[18px] overflow-hidden shrink-0 max-w-full"
                    />
                    <div
                      class="text-gray-900 text-center text-sm font-medium leading-5 tracking-normal whitespace-nowrap"
                    >
                      Memory: 32-128 GB
                    </div>
                  </div>
                </div>
                <div
                  class="justify-center bg-purple-200 flex grow basis-[0%] flex-col px-2 py-1.5 rounded-lg"
                >
                  <div class="justify-center items-stretch flex gap-2">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5819e3a-c609-4fb1-b112-22d85f99b90d?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                      class="aspect-square object-contain object-center w-[18px] overflow-hidden shrink-0 max-w-full"
                    />
                    <div
                      class="text-gray-900 text-center text-sm font-medium leading-5 tracking-normal whitespace-nowrap"
                    >
                      CPU: min 4 Cores
                    </div>
                  </div>
                </div>
                <div
                  class="justify-center bg-purple-200 flex grow basis-[0%] flex-col px-2 py-1.5 rounded-lg"
                >
                  <div class="justify-center items-stretch flex gap-2">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab8d21f7-633e-4427-90ba-968737efdc93?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                      class="aspect-square object-contain object-center w-[18px] overflow-hidden shrink-0 max-w-full"
                    />
                    <div
                      class="text-gray-900 text-center text-sm font-medium leading-5 tracking-normal whitespace-nowrap"
                    >
                      OS: Windows
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="items-stretch bg-fuchsia-50 self-stretch flex flex-col mt-4 rounded-2xl max-md:max-w-full"
              >
                <div
                  class="items-stretch bg-fuchsia-50 flex flex-col pl-14 pr-6 py-3.5 rounded-2xl max-md:max-w-full max-md:px-5"
                >
                  <div class="items-stretch flex flex-col max-md:max-w-full">
                    <div
                      class="items-stretch flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap"
                    >
                      <div
                        class="justify-center text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto max-md:max-w-full"
                      >
                        Amazon Elastic Compute Cloud - c5d.4xlarge
                      </div>
                      <div
                        class="flex-col overflow-hidden relative flex aspect-square w-6 items-stretch"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fb480da-ccdf-47e6-bbe8-23a703a23e70?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/85247fdb-ab4e-4b7e-80df-ed653464b86e?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="aspect-square object-contain object-center w-full overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex w-[819px] max-w-full items-stretch justify-between gap-5 ml-6 mt-1.5 self-start max-md:flex-wrap"
                  >
                    <div
                      class="flex items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center"
                    >
                      <div class="items-stretch flex basis-[0%] flex-col">
                        <div
                          class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                        >
                          CPU
                        </div>
                        <div
                          class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                        >
                          16 Cores
                        </div>
                      </div>
                      <div class="items-stretch flex basis-[0%] flex-col">
                        <div
                          class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                        >
                          Memory
                        </div>
                        <div
                          class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                        >
                          32 GiB
                        </div>
                      </div>
                      <div class="items-stretch flex grow basis-[0%] flex-col">
                        <div
                          class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                        >
                          Storage
                        </div>
                        <div
                          class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                        >
                          1 x 400 NVMe SSD
                        </div>
                      </div>
                    </div>
                    <div class="items-stretch flex basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Location
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        Asia Pacific (Jakarta)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="items-stretch bg-zinc-200 self-stretch flex flex-col mt-5 rounded-2xl max-md:max-w-full"
              >
                <div
                  class="items-stretch bg-zinc-200 flex flex-col pl-14 pr-6 py-3.5 rounded-2xl max-md:max-w-full max-md:px-5"
                >
                  <div class="items-stretch flex flex-col max-md:max-w-full">
                    <div
                      class="items-stretch flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap"
                    >
                      <div
                        class="justify-center text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto max-md:max-w-full"
                      >
                        Amazon Elastic Compute Cloud - c5d.4xlarge
                      </div>
                      <div
                        class="flex-col overflow-hidden relative flex aspect-square w-6 items-stretch"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/62a37432-7d88-4033-bc70-66af6772bbed?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1473014-6280-4ffa-8ec5-af9d0c77ba65?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="aspect-square object-contain object-center w-full overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex w-[819px] max-w-full items-stretch justify-between gap-0 ml-6 mt-1.5 self-start max-md:flex-wrap max-md:justify-center"
                  >
                    <div
                      class="items-stretch bg-zinc-200 flex basis-[0%] flex-col"
                    >
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        CPU
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        32 Cores
                      </div>
                    </div>
                    <div
                      class="items-stretch bg-zinc-200 flex basis-[0%] flex-col"
                    >
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Memory
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        64 GiB
                      </div>
                    </div>
                    <div
                      class="items-stretch bg-zinc-200 flex grow basis-[0%] flex-col"
                    >
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Storage
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        1 x 200 NVMe SSD
                      </div>
                    </div>
                    <div
                      class="items-stretch bg-zinc-200 flex basis-[0%] flex-col"
                    >
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        OS
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        Windows
                      </div>
                    </div>
                    <div
                      class="items-stretch bg-zinc-200 flex grow basis-[0%] flex-col"
                    >
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Location
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        US-West
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="items-stretch bg-fuchsia-50 self-stretch flex flex-col mt-5 rounded-2xl max-md:max-w-full"
              >
                <div
                  class="items-stretch bg-fuchsia-50 flex flex-col pl-14 pr-6 py-3.5 rounded-2xl max-md:max-w-full max-md:px-5"
                >
                  <div class="items-stretch flex flex-col max-md:max-w-full">
                    <div
                      class="items-stretch flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap"
                    >
                      <div
                        class="justify-center text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto max-md:max-w-full"
                      >
                        Amazon Elastic Compute Cloud - c5d.4xlarge
                      </div>
                      <div
                        class="flex-col overflow-hidden relative flex aspect-square w-6 items-stretch"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dcc097f0-665f-4b16-8318-d59b9a042490?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/888b14dc-c33a-479f-8ae9-b4fbe119fab1?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="aspect-square object-contain object-center w-full overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex w-[819px] max-w-full items-stretch justify-between gap-0 ml-6 mt-1.5 self-start max-md:flex-wrap max-md:justify-center"
                  >
                    <div class="items-stretch flex basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        CPU
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        64 Cores
                      </div>
                    </div>
                    <div class="items-stretch flex basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Memory
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        128 GiB
                      </div>
                    </div>
                    <div class="items-stretch flex grow basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Storage
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        2 x 400 NVMe SSD
                      </div>
                    </div>
                    <div class="items-stretch flex basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        OS
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        Windows
                      </div>
                    </div>
                    <div class="items-stretch flex grow basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Location
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        EU-Central
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="items-stretch bg-fuchsia-50 self-stretch flex flex-col mt-5 rounded-2xl max-md:max-w-full"
              >
                <div
                  class="items-stretch bg-fuchsia-50 flex flex-col pl-14 pr-6 py-3.5 rounded-2xl max-md:max-w-full max-md:px-5"
                >
                  <div class="items-stretch flex flex-col max-md:max-w-full">
                    <div
                      class="items-stretch flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap"
                    >
                      <div
                        class="justify-center text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto max-md:max-w-full"
                      >
                        Amazon Elastic Compute Cloud - c5d.4xlarge
                      </div>
                      <div
                        class="flex-col overflow-hidden relative flex aspect-square w-6 items-stretch"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bc26e4d-2443-4ca5-965c-0d0b38403bce?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bd7ef91-7bf9-45d1-8bd4-465b32e5bd74?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="aspect-square object-contain object-center w-full overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex w-[819px] max-w-full items-stretch justify-between gap-5 ml-6 mt-1.5 self-start max-md:flex-wrap"
                  >
                    <div
                      class="flex items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center"
                    >
                      <div class="items-stretch flex basis-[0%] flex-col">
                        <div
                          class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                        >
                          CPU
                        </div>
                        <div
                          class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                        >
                          16 Cores
                        </div>
                      </div>
                      <div class="items-stretch flex basis-[0%] flex-col">
                        <div
                          class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                        >
                          Memory
                        </div>
                        <div
                          class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                        >
                          32 GiB
                        </div>
                      </div>
                      <div class="items-stretch flex grow basis-[0%] flex-col">
                        <div
                          class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                        >
                          Storage
                        </div>
                        <div
                          class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                        >
                          1 x 400 NVMe SSD
                        </div>
                      </div>
                    </div>
                    <div class="items-stretch flex basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Location
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        Asia Pacific (Jakarta)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="items-stretch bg-fuchsia-50 self-stretch flex flex-col mt-5 rounded-2xl max-md:max-w-full"
              >
                <div
                  class="items-stretch bg-fuchsia-50 flex flex-col pl-14 pr-6 py-3.5 rounded-2xl max-md:max-w-full max-md:px-5"
                >
                  <div class="items-stretch flex flex-col max-md:max-w-full">
                    <div
                      class="items-stretch flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap"
                    >
                      <div
                        class="justify-center text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto max-md:max-w-full"
                      >
                        Amazon Elastic Compute Cloud - c5d.4xlarge
                      </div>
                      <div
                        class="flex-col overflow-hidden relative flex aspect-square w-6 items-stretch"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/59056890-25c2-4abe-a630-adcfd0e9b985?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba7ba6e3-82f0-4455-82a4-71d9d4899a10?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="aspect-square object-contain object-center w-full overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex w-[819px] max-w-full items-stretch justify-between gap-5 ml-6 mt-1.5 self-start max-md:flex-wrap"
                  >
                    <div
                      class="flex items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center"
                    >
                      <div class="items-stretch flex basis-[0%] flex-col">
                        <div
                          class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                        >
                          CPU
                        </div>
                        <div
                          class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                        >
                          32 Cores
                        </div>
                      </div>
                      <div class="items-stretch flex basis-[0%] flex-col">
                        <div
                          class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                        >
                          Memory
                        </div>
                        <div
                          class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                        >
                          64 GiB
                        </div>
                      </div>
                      <div class="items-stretch flex grow basis-[0%] flex-col">
                        <div
                          class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                        >
                          Storage
                        </div>
                        <div
                          class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                        >
                          1 x 200 NVMe SSD
                        </div>
                      </div>
                    </div>
                    <div class="items-stretch flex basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Location
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        US-West
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="items-stretch bg-fuchsia-50 self-stretch flex flex-col mt-5 rounded-2xl max-md:max-w-full"
              >
                <div
                  class="items-stretch bg-fuchsia-50 flex flex-col pl-14 pr-6 py-3.5 rounded-2xl max-md:max-w-full max-md:px-5"
                >
                  <div class="items-stretch flex flex-col max-md:max-w-full">
                    <div
                      class="items-stretch flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap"
                    >
                      <div
                        class="justify-center text-zinc-900 text-base leading-6 tracking-wide grow shrink basis-auto max-md:max-w-full"
                      >
                        Amazon Elastic Compute Cloud - c5d.4xlarge
                      </div>
                      <div
                        class="flex-col overflow-hidden relative flex aspect-square w-6 items-stretch"
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/04dbea8b-162f-480f-9e6f-8ab258625729?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="absolute z-[-1] h-full w-full object-cover object-center inset-0"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f153631-3b04-4f05-9e0c-e8d2568184dd?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                          class="aspect-square object-contain object-center w-full overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex w-[819px] max-w-full items-stretch justify-between gap-0 ml-6 mt-1.5 self-start max-md:flex-wrap max-md:justify-center"
                  >
                    <div class="items-stretch flex basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        CPU
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        64 Cores
                      </div>
                    </div>
                    <div class="items-stretch flex basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Memory
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        128 GiB
                      </div>
                    </div>
                    <div class="items-stretch flex grow basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Storage
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        2 x 400 NVMe SSD
                      </div>
                    </div>
                    <div class="items-stretch flex basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        OS
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        Windows
                      </div>
                    </div>
                    <div class="items-stretch flex grow basis-[0%] flex-col">
                      <div
                        class="text-zinc-700 text-xs font-medium leading-4 tracking-wide"
                      >
                        Location
                      </div>
                      <div
                        class="justify-center text-zinc-900 text-base font-medium leading-6 tracking-normal"
                      >
                        EU-Central
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MyComponent {
}

@NgModule({
    declarations: [MyComponent],
    imports: [CommonModule],
    exports: [MyComponent]
})
export class MyComponentModule {
}
