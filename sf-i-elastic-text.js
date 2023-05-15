/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
// import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
import { customElement, query, property } from 'lit/decorators.js';
// import {customElement, query, property} from 'lit/decorators.js';
// import Util from './util';
// import {LitElement, html, css} from 'lit';
// import {customElement} from 'lit/decorators.js';
/*

Modes: View, Add, Edit, Delete, Admin
DB: partitionKey, rangeKey, values

*/
/**
 * SfIElasticText element.
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - input label
 * @property name - name of the input
 * @property mode - mode of operation
 * @property selectedId - id to preselect
 * @property selectedValue - callback function
 */
let SfIElasticText = class SfIElasticText extends LitElement {
    constructor() {
        super();
        this.truncate = (str, n, useWordBoundary) => {
            if (str.length <= n) {
                return str;
            }
            const subString = str.slice(0, n - 1); // the original check
            return (useWordBoundary
                ? subString.slice(0, subString.lastIndexOf(" "))
                : subString) + "&hellip;";
        };
        this.showNext = () => {
            this._SfButtonNext.style.display = 'block';
            this._SfButtonPrev.style.display = 'none';
        };
        this.showPrev = () => {
            this._SfButtonNext.style.display = 'none';
            this._SfButtonPrev.style.display = 'block';
        };
        this.renderNext = () => {
            if (this.text.length <= this.minLength) {
                this._SfDivText.innerHTML = this.text;
                this._SfButtonNext.style.display = 'none';
            }
            else {
                var text = this.truncate(this.text, this.minLength, true);
                this._SfDivText.innerHTML = text;
            }
        };
        this.renderPrev = () => {
            var text = this.text;
            this._SfDivText.innerHTML = text;
        };
        this.showTruncated = () => {
            this.showNext();
            this.renderNext();
        };
        this.showExpanded = () => {
            this.showPrev();
            this.renderPrev();
        };
        this.initListeners = () => {
            this._SfButtonNext.addEventListener('click', () => {
                this.showExpanded();
            });
            this._SfButtonPrev.addEventListener('click', () => {
                this.showTruncated();
            });
        };
        this.loadMode = async () => {
            this.initListeners();
            this.showTruncated();
        };
    }
    firstUpdated(_changedProperties) {
        this.loadMode();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        return html `
          
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div part="text-container" class="SfIElasticTextC d-flex align-center">
        <div id="div-text" part="text-view">${this.text}</div>
        <span part="text-next" id="button-next" class="material-icons cursor color-lt-gray">chevron_right</span>
        <span part="text-prev" id="button-prev" class="material-icons cursor color-lt-gray">chevron_left</span>
      </div>

    `;
    }
};
SfIElasticText.styles = css `

    
    .SfIElasticTextC {
    }

    .flex-grow {
      flex-grow: 1;
    }

    .left-sticky {
      left: 0px;
      position: sticky;
    }

    .color-lt-gray {
      color: #999;
      font-size: 95%;
    }

    .link {
      text-decoration: underline;
      cursor: pointer;
    }

    .cursor {
      cursor: pointer;
    }

    .gone {
      display: none
    }

    .loader-element {
      position: fixed;
      right: 10px;
      top: 10px;
      margin-left: 5px;
    }

    .td-head {
      text-transform: capitalize;
    }

    .td-body {
      padding: 5px;
    }

    .td-dark {
      background-color: #e9e9e9;
    }

    .td-highlight {
      background-color: black;
      color: white;
    }

    .td-light {
      background-color: #f6f6f6;
    }

    td {
      white-space: nowrap;
    }

    .align-start {
      align-items: flex-start;
    }

    .align-end {
      align-items: flex-end;
    }

    .align-center {
      align-items: center;
    }
    
    .lds-dual-ring {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 50px;
      height: 50px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      background-color: white;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 30px;
      height: 30px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .div-row-error {
      display: flex;
      justify-content: center;
      position: fixed;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px red;
      padding: 20px;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .div-row-success {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px green;
      padding: 20px;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .d-flex {
      display: flex;
    }

    .flex-col {
      flex-direction: column;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .justify-end {
      justify-content: flex-end;
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }  

    .hide {
      display: none;
    }

    .lb {
      width: 5%
    }
    .rb {
      width: 5%
    }

    @media (orientation: landscape) {

      .lb {
        width: 30%
      }
      .rb {
        width: 30%
      }

    }

  `;
__decorate([
    property()
], SfIElasticText.prototype, "text", void 0);
__decorate([
    property()
], SfIElasticText.prototype, "minLength", void 0);
__decorate([
    query('.SfIElasticTextC')
], SfIElasticText.prototype, "_SfIEventsC", void 0);
__decorate([
    query('#button-next')
], SfIElasticText.prototype, "_SfButtonNext", void 0);
__decorate([
    query('#button-prev')
], SfIElasticText.prototype, "_SfButtonPrev", void 0);
__decorate([
    query('#div-text')
], SfIElasticText.prototype, "_SfDivText", void 0);
SfIElasticText = __decorate([
    customElement('sf-i-elastic-text')
], SfIElasticText);
export { SfIElasticText };
//# sourceMappingURL=sf-i-elastic-text.js.map