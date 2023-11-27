import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "my-component, MyComponent",
    template: `
    <div class="div">
      <div class="div-2">
        <div class="div-3">Cloud-Domination-Tool</div>
        <div class="div-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a1b9fd0-4618-490d-8b2c-cd80d25a7285?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
            class="img"
          />
        </div>
      </div>
      <div class="div-5">Your configuration</div>
      <div class="div-6">
        <div class="div-7">AWS</div>
        <div class="div-8">Azure</div>
        <div class="div-9">GCP</div>
      </div>
      <div class="div-10">
        <div class="div-11">Networking</div>
        <div class="div-12">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b86e01fa-5b8a-4f21-a3b8-10cc4faef371?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
            class="img-2"
          />
          <div class="div-13">Firewall</div>
          <div class="div-14">2</div>
          <div class="div-15">x</div>
          <div class="div-16">
            <div class="div-17">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d568edb-7cb3-4b9f-91a4-69693e8a3068?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                class="img-3"
              />
              <div class="div-18">555 €</div>
            </div>
          </div>
          <div class="div-19">605 €</div>
          <div class="div-20">777 €</div>
        </div>
        <div class="div-21">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/640283a6-14b2-4d0a-8635-5fe7db422ef4?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
            class="img-4"
          />
          <div class="div-22">Load-Balancer</div>
          <div class="div-23">7632 €</div>
          <div class="div-24">
            <div class="div-25">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a76bc194-bcca-4922-bbdb-275abc6037be?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                class="img-5"
              />
              <div class="div-26">5632 €</div>
            </div>
          </div>
          <div class="div-27">10.176 €</div>
        </div>
        <div class="div-28"></div>
        <div class="div-29">Virtual Machines</div>
        <div class="div-30">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f997a1ff-5299-43c3-9e4c-1a70571bb2b5?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
            class="img-6"
          />
          <div class="div-31">VM-8-32</div>
          <div class="div-32">4</div>
          <div class="div-33">x</div>
          <div class="div-34">
            <div class="div-35">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/92bdb825-35dc-48ee-9210-78151269e9d5?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                class="img-7"
              />
              <div class="div-36">555 €</div>
            </div>
          </div>
          <div class="div-37">605 €</div>
          <div class="div-38">777 €</div>
        </div>
        <div class="div-39">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1275ff01-5037-4ade-bf3f-ddc1565d8942?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
            class="img-8"
          />
          <div class="div-40">c5d.12xlarge</div>
          <div class="div-41">2</div>
          <div class="div-42">x</div>
          <div class="div-43">1299 €</div>
          <div class="div-44">1400 €</div>
          <div class="div-45">
            <div class="div-46">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c475b1b8-c85f-470c-ad99-47e52fb62f5e?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                class="img-9"
              />
              <div class="div-47">999 €</div>
            </div>
          </div>
        </div>
        <div class="div-48"></div>
        <div class="div-49">IoT</div>
        <div class="div-50">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2b7774d-078a-49ed-a6dc-1fafb60e05bc?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
            class="img-10"
          />
          <div class="div-51">MQTT-Broker</div>
          <div class="div-52">1299 €</div>
          <div class="div-53">1400 €</div>
          <div class="div-54">
            <div class="div-55">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bd71e92-08e4-42e3-b32e-c44bbee0b55d?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                class="img-11"
              />
              <div class="div-56">999 €</div>
            </div>
          </div>
        </div>
        <div class="div-57">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b790548-f3c3-4abd-ac70-c36e72e4830c?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
            class="img-12"
          />
          <div class="div-58">IoT-Dashboard</div>
          <div class="div-59">7632 €</div>
          <div class="div-60">
            <div class="div-61">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6deb12a-c0ad-47b3-83ab-09f5cc94d1dd?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                class="img-13"
              />
              <div class="div-62">5632 €</div>
            </div>
          </div>
          <div class="div-63">10.176 €</div>
        </div>
        <div class="div-64"></div>
        <div class="div-65">Logging</div>
        <div class="div-66">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/167c6640-0831-429c-9dc9-8795c82405a4?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
            class="img-14"
          />
          <div class="div-67">Log Retention 2 Days</div>
          <div class="div-68">
            <div class="div-69">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8da4ee6f-b8b8-4af0-a549-ce96a4c40109?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
                class="img-15"
              />
              <div class="div-70">555 €</div>
            </div>
          </div>
          <div class="div-71">605 €</div>
          <div class="div-72">777 €</div>
        </div>
      </div>
      <div class="div-73">
        <div class="div-74">
          <div class="div-75">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/111632b8-2837-47c2-b936-44b9d55484f8?apiKey=44984f5ef77a45b0b75fe523b4299e21&"
              class="img-16"
            />
            <div class="div-76">Back to the overview</div>
          </div>
        </div>
        <div class="div-77">Save</div>
      </div>
    </div>
  `,
    styles: [
        `
      .div {
        background-color: var(--m-3-white, #fff);
        display: flex;
        flex-direction: column;
      }
      .div-2 {
        align-items: center;
        background-color: var(--m-3-sys-light-surface, #fef7ff);
        align-self: stretch;
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 6px;
        padding: 12px 20px;
      }
      @media (max-width: 991px) {
        .div-2 {
          max-width: 100%;
          flex-wrap: wrap;
        }
      }
      .div-3 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        flex-grow: 1;
        flex-basis: auto;
        margin: auto 0;
        font: 400 22px/127% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-3 {
          max-width: 100%;
        }
      }
      .div-4 {
        justify-content: center;
        background-color: var(
          --m-3-state-layers-light-on-surface-variant-opacity-012,
          rgba(73, 69, 79, 0.12)
        );
        align-self: stretch;
        display: flex;
        aspect-ratio: 1;
        flex-direction: column;
        padding: 8px;
      }
      .img {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 24px;
        overflow: hidden;
      }
      .div-5 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        align-self: stretch;
        margin-top: 13px;
        width: 100%;
        font: 400 22px/127% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-5 {
          max-width: 100%;
        }
      }
      .div-6 {
        align-self: end;
        display: flex;
        width: 324px;
        max-width: 100%;
        gap: 0px;
        margin: 7px 88px 0 0;
        padding: 0 20px;
      }
      @media (max-width: 991px) {
        .div-6 {
          margin-right: 10px;
          justify-content: center;
        }
      }
      .div-7 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 100px 0px 0px 100px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        flex-grow: 1;
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-7 {
          white-space: initial;
        }
      }
      .div-8 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        flex-grow: 1;
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-8 {
          white-space: initial;
        }
      }
      .div-9 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 0px 100px 100px 0px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        flex-grow: 1;
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-9 {
          white-space: initial;
        }
      }
      .div-10 {
        border-radius: 16px;
        background-color: var(--m-3-sys-light-surface-container-low, #f7f2fa);
        align-self: center;
        display: flex;
        margin-top: 17px;
        width: 100%;
        max-width: 1359px;
        flex-direction: column;
        padding: 23px 28px;
      }
      @media (max-width: 991px) {
        .div-10 {
          max-width: 100%;
          padding: 0 20px;
        }
      }
      .div-11 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        letter-spacing: 0.15px;
        white-space: nowrap;
        font: 500 16px/150% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-11 {
          max-width: 100%;
          white-space: initial;
        }
      }
      .div-12 {
        display: flex;
        margin-top: 20px;
        padding-right: 2px;
        gap: 0px;
      }
      @media (max-width: 991px) {
        .div-12 {
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }
      }
      .img-2 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 24px;
        overflow: hidden;
        align-self: center;
        max-width: 100%;
        margin: auto 0;
      }
      .div-13 {
        color: #1d192b;
        letter-spacing: 0.1px;
        align-self: center;
        flex-grow: 1;
        flex-basis: auto;
        margin: auto 0;
        font: 600 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-13 {
          max-width: 100%;
        }
      }
      .div-14 {
        color: #1d192b;
        text-align: right;
        letter-spacing: 0.1px;
        align-self: center;
        margin: auto 0;
        font: 600 14px/143% Roboto, sans-serif;
      }
      .div-15 {
        color: #1d192b;
        text-align: right;
        letter-spacing: 0.1px;
        align-self: center;
        margin: auto 0;
        font: 600 14px/143% Roboto, sans-serif;
      }
      .div-16 {
        justify-content: center;
        align-items: center;
        border-radius: 100px 0px 0px 100px;
        border: 1px solid #79747e;
        background-color: #e8def8;
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
      }
      .div-17 {
        justify-content: center;
        display: flex;
        gap: 8px;
      }
      .img-3 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 18px;
        overflow: hidden;
        max-width: 100%;
      }
      .div-18 {
        color: #1d192b;
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-18 {
          white-space: initial;
        }
      }
      .div-19 {
        color: #1d1b20;
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        border: 1px solid #79747e;
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-19 {
          white-space: initial;
        }
      }
      .div-20 {
        color: #1d1b20;
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 0px 100px 100px 0px;
        border: 1px solid #79747e;
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-20 {
          white-space: initial;
        }
      }
      .div-21 {
        align-items: center;
        display: flex;
        margin-top: 16px;
        padding-right: 2px;
        gap: 0px;
      }
      @media (max-width: 991px) {
        .div-21 {
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }
      }
      .img-4 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 24px;
        overflow: hidden;
        max-width: 100%;
        margin: auto 0;
      }
      .div-22 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        letter-spacing: 0.1px;
        flex-grow: 1;
        flex-basis: auto;
        margin: auto 0;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-22 {
          max-width: 100%;
        }
      }
      .div-23 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 100px 0px 0px 100px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-23 {
          white-space: initial;
        }
      }
      .div-24 {
        justify-content: center;
        align-self: stretch;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        background-color: var(--m-3-sys-light-secondary-container, #e8def8);
        display: flex;
        flex-basis: 0%;
        flex-direction: column;
        padding: 10px 19px;
      }
      .div-25 {
        justify-content: space-between;
        display: flex;
        gap: 8px;
      }
      .img-5 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 18px;
        overflow: hidden;
        max-width: 100%;
      }
      .div-26 {
        color: var(--m-3-sys-light-on-secondary-container, #1d192b);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-26 {
          white-space: initial;
        }
      }
      .div-27 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 0px 100px 100px 0px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-27 {
          white-space: initial;
        }
      }
      .div-28 {
        background-color: #cac4d0;
        margin-top: 8px;
        height: 1px;
      }
      @media (max-width: 991px) {
        .div-28 {
          max-width: 100%;
        }
      }
      .div-29 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        letter-spacing: 0.15px;
        margin-top: 18px;
        white-space: nowrap;
        font: 500 16px/150% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-29 {
          max-width: 100%;
          white-space: initial;
        }
      }
      .div-30 {
        display: flex;
        margin-top: 26px;
        padding-right: 2px;
        gap: 0px;
      }
      @media (max-width: 991px) {
        .div-30 {
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }
      }
      .img-6 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 24px;
        overflow: hidden;
        align-self: center;
        max-width: 100%;
        margin: auto 0;
      }
      .div-31 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        letter-spacing: 0.1px;
        align-self: center;
        flex-grow: 1;
        flex-basis: auto;
        margin: auto 0;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-31 {
          max-width: 100%;
        }
      }
      .div-32 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        text-align: right;
        letter-spacing: 0.1px;
        align-self: center;
        margin: auto 0;
        font: 500 14px/143% Roboto, sans-serif;
      }
      .div-33 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        text-align: right;
        letter-spacing: 0.1px;
        align-self: center;
        margin: auto 0;
        font: 500 14px/143% Roboto, sans-serif;
      }
      .div-34 {
        justify-content: center;
        align-items: center;
        border-radius: 100px 0px 0px 100px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        background-color: var(--m-3-sys-light-secondary-container, #e8def8);
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
      }
      .div-35 {
        justify-content: center;
        display: flex;
        gap: 8px;
      }
      .img-7 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 18px;
        overflow: hidden;
        max-width: 100%;
      }
      .div-36 {
        color: var(--m-3-sys-light-on-secondary-container, #1d192b);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-36 {
          white-space: initial;
        }
      }
      .div-37 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-37 {
          white-space: initial;
        }
      }
      .div-38 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 0px 100px 100px 0px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-38 {
          white-space: initial;
        }
      }
      .div-39 {
        display: flex;
        margin-top: 16px;
        padding-right: 2px;
        gap: 0px;
      }
      @media (max-width: 991px) {
        .div-39 {
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }
      }
      .img-8 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 24px;
        overflow: hidden;
        align-self: center;
        max-width: 100%;
        margin: auto 0;
      }
      .div-40 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        letter-spacing: 0.1px;
        align-self: center;
        flex-grow: 1;
        flex-basis: auto;
        margin: auto 0;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-40 {
          max-width: 100%;
        }
      }
      .div-41 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        text-align: right;
        letter-spacing: 0.1px;
        align-self: center;
        margin: auto 0;
        font: 500 14px/143% Roboto, sans-serif;
      }
      .div-42 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        text-align: right;
        letter-spacing: 0.1px;
        align-self: center;
        margin: auto 0;
        font: 500 14px/143% Roboto, sans-serif;
      }
      .div-43 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 100px 0px 0px 100px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-43 {
          white-space: initial;
        }
      }
      .div-44 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-44 {
          white-space: initial;
        }
      }
      .div-45 {
        justify-content: center;
        align-items: center;
        border-radius: 0px 100px 100px 0px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        background-color: var(--m-3-sys-light-secondary-container, #e8def8);
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
      }
      .div-46 {
        justify-content: center;
        display: flex;
        gap: 8px;
      }
      .img-9 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 18px;
        overflow: hidden;
        max-width: 100%;
      }
      .div-47 {
        color: var(--m-3-sys-light-on-secondary-container, #1d192b);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-47 {
          white-space: initial;
        }
      }
      .div-48 {
        background-color: #cac4d0;
        margin-top: 8px;
        height: 1px;
      }
      @media (max-width: 991px) {
        .div-48 {
          max-width: 100%;
        }
      }
      .div-49 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        letter-spacing: 0.15px;
        margin-top: 18px;
        white-space: nowrap;
        font: 500 16px/150% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-49 {
          max-width: 100%;
          white-space: initial;
        }
      }
      .div-50 {
        align-items: center;
        display: flex;
        margin-top: 26px;
        padding-right: 2px;
        gap: 0px;
      }
      @media (max-width: 991px) {
        .div-50 {
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }
      }
      .img-10 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 24px;
        overflow: hidden;
        max-width: 100%;
        margin: auto 0;
      }
      .div-51 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        letter-spacing: 0.1px;
        flex-grow: 1;
        flex-basis: auto;
        margin: auto 0;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-51 {
          max-width: 100%;
        }
      }
      .div-52 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 100px 0px 0px 100px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-52 {
          white-space: initial;
        }
      }
      .div-53 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-53 {
          white-space: initial;
        }
      }
      .div-54 {
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 0px 100px 100px 0px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        background-color: var(--m-3-sys-light-secondary-container, #e8def8);
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
      }
      .div-55 {
        justify-content: center;
        display: flex;
        gap: 8px;
      }
      .img-11 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 18px;
        overflow: hidden;
        max-width: 100%;
      }
      .div-56 {
        color: var(--m-3-sys-light-on-secondary-container, #1d192b);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-56 {
          white-space: initial;
        }
      }
      .div-57 {
        align-items: center;
        display: flex;
        margin-top: 16px;
        padding-right: 2px;
        gap: 0px;
      }
      @media (max-width: 991px) {
        .div-57 {
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }
      }
      .img-12 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 24px;
        overflow: hidden;
        max-width: 100%;
        margin: auto 0;
      }
      .div-58 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        letter-spacing: 0.1px;
        flex-grow: 1;
        flex-basis: auto;
        margin: auto 0;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-58 {
          max-width: 100%;
        }
      }
      .div-59 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 100px 0px 0px 100px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-59 {
          white-space: initial;
        }
      }
      .div-60 {
        justify-content: center;
        align-self: stretch;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        background-color: var(--m-3-sys-light-secondary-container, #e8def8);
        display: flex;
        flex-basis: 0%;
        flex-direction: column;
        padding: 10px 19px;
      }
      .div-61 {
        justify-content: space-between;
        display: flex;
        gap: 8px;
      }
      .img-13 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 18px;
        overflow: hidden;
        max-width: 100%;
      }
      .div-62 {
        color: var(--m-3-sys-light-on-secondary-container, #1d192b);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-62 {
          white-space: initial;
        }
      }
      .div-63 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 0px 100px 100px 0px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-63 {
          white-space: initial;
        }
      }
      .div-64 {
        background-color: #cac4d0;
        margin-top: 8px;
        height: 1px;
      }
      @media (max-width: 991px) {
        .div-64 {
          max-width: 100%;
        }
      }
      .div-65 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        letter-spacing: 0.15px;
        margin-top: 18px;
        white-space: nowrap;
        font: 500 16px/150% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-65 {
          max-width: 100%;
          white-space: initial;
        }
      }
      .div-66 {
        align-items: center;
        display: flex;
        margin-top: 26px;
        padding-right: 2px;
        gap: 0px;
      }
      @media (max-width: 991px) {
        .div-66 {
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }
      }
      .img-14 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 24px;
        overflow: hidden;
        max-width: 100%;
        margin: auto 0;
      }
      .div-67 {
        color: var(--m-3-sys-light-on-surface-variant, #49454f);
        letter-spacing: 0.1px;
        flex-grow: 1;
        flex-basis: auto;
        margin: auto 0;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-67 {
          max-width: 100%;
        }
      }
      .div-68 {
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 100px 0px 0px 100px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        background-color: var(--m-3-sys-light-secondary-container, #e8def8);
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
      }
      .div-69 {
        justify-content: center;
        display: flex;
        gap: 8px;
      }
      .img-15 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 18px;
        overflow: hidden;
        max-width: 100%;
      }
      .div-70 {
        color: var(--m-3-sys-light-on-secondary-container, #1d192b);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-70 {
          white-space: initial;
        }
      }
      .div-71 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-71 {
          white-space: initial;
        }
      }
      .div-72 {
        color: var(--m-3-sys-light-on-surface, #1d1b20);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 0px 100px 100px 0px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-72 {
          white-space: initial;
        }
      }
      .div-73 {
        align-self: end;
        display: flex;
        width: 285px;
        max-width: 100%;
        gap: 8px;
        margin: 13px 50px 30px 0;
      }
      @media (max-width: 991px) {
        .div-73 {
          margin-right: 10px;
        }
      }
      .div-74 {
        justify-content: center;
        align-items: start;
        border-radius: 100px;
        border: 1px solid var(--m-3-sys-light-outline, #79747e);
        display: flex;
        flex-grow: 1;
        flex-basis: 0%;
        flex-direction: column;
        padding: 10px 16px;
      }
      .div-75 {
        justify-content: center;
        display: flex;
        gap: 8px;
      }
      .img-16 {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 18px;
        overflow: hidden;
        max-width: 100%;
      }
      .div-76 {
        color: var(--m-3-sys-light-primary, #6750a4);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-76 {
          white-space: initial;
        }
      }
      .div-77 {
        color: var(--m-3-sys-light-on-primary, #fff);
        text-align: center;
        letter-spacing: 0.1px;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        background-color: var(--m-3-sys-light-primary, #6750a4);
        padding: 10px 20px;
        font: 500 14px/143% Roboto, sans-serif;
      }
      @media (max-width: 991px) {
        .div-77 {
          white-space: initial;
        }
      }
    `
    ]
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
