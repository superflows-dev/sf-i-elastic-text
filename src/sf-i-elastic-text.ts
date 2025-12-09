/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */

import { LitElement, html, css, PropertyValueMap } from 'lit';
// import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
import { customElement, query, property } from 'lit/decorators.js';
// import {customElement, query, property} from 'lit/decorators.js';
import Util from './util';
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
@customElement('sf-i-elastic-text')
export class SfIElasticText extends LitElement {

  @property()
  text!: string;

  @property()
  highlight: string = "";

  @property()
  minLength!: number;

  @property()
  lineSize: number = 0;


  static override styles = css`

    
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

    #button-next {
      font-size: 110%;
      margin-bottom: 4px;
    }


    #button-prev {
      font-size: 100%;
      margin-left: 3px;
      margin-bottom: 4px;
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

  @query('.SfIElasticTextC')
  _SfIEventsC: any;

  @query('#button-next')
  _SfButtonNext: any;

  @query('#button-prev')
  _SfButtonPrev: any;

  @query('#div-text')
  _SfDivText: any;

  @query('#div-highlight-count')
  _SfDivHighlightCount: any;

  constructor() {
    super();
  }

  truncate = (str: string, n: number, useWordBoundary: boolean) => {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n - 1); // the original check
    return (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;";
  };

  showNext = () => {
    (this._SfButtonNext as HTMLElement).style.display = 'block';
    (this._SfButtonPrev as HTMLElement).style.display = 'none';
  }

  showPrev = () => {
    (this._SfButtonNext as HTMLElement).style.display = 'none';
    (this._SfButtonPrev as HTMLElement).style.display = 'block';
  }
  
  showMatches = () => {
    if(this.highlight != ""){
      const regex = new RegExp(`(${Util.escapeRegExp(this.highlight)})`, 'gi');
      const matches = this.text.match(regex)
      if(matches != null){
        (this._SfDivHighlightCount as HTMLDivElement).style.display = 'block';
        (this._SfDivHighlightCount as HTMLDivElement).innerHTML = `${matches.length} instance(s)`;
        return;
      }
    }
    (this._SfDivHighlightCount as HTMLDivElement).style.display = 'none';
  }

  getInnerHTMLFromText = (text: string) => {

    if (this.lineSize > 0) {

      const strArr = text.split(' ');
      var innerHTML = ''
      for (var i = 0; i < strArr.length; i++) {

        if (this.highlight != "") {
          const regex = new RegExp(`(${Util.escapeRegExp(this.highlight)})`, 'gi');
          console.log('highlight', this.highlight, strArr[i]);
          innerHTML += strArr[i].replace(regex, '<span part="highlight">$1</span>')
        } else {
          innerHTML += strArr[i];
        }
        if (i < (strArr.length - 1)) {
          innerHTML += ' ';
        }

        // console.log('percent', i%this.lineSize);

        if ((i + 1) % this.lineSize === 0) {
          innerHTML += '<br />';
        }

      }
      return innerHTML;

    } else {
      let innerHTML = ''
      if (this.highlight != "") {
        const regex = new RegExp(`(${Util.escapeRegExp(this.highlight)})`, 'gi');
        console.log('highlight', this.highlight, text);
        innerHTML += text.replace(regex, '<span part="highlight">$1</span>')
      } else {
        innerHTML += text;
      }
      return innerHTML;
    }


  }

  renderNext = () => {

    if (this.text.length <= this.minLength) {

      (this._SfDivText as HTMLDivElement).innerHTML = this.getInnerHTMLFromText(this.text);
      (this._SfButtonNext as HTMLElement).style.display = 'none';
    } else {

      var text = this.truncate(this.text, this.minLength, true);
      (this._SfDivText as HTMLDivElement).innerHTML = this.getInnerHTMLFromText(text);
    }

  }

  renderPrev = () => {
    var text = this.text;
    (this._SfDivText as HTMLDivElement).innerHTML = this.getInnerHTMLFromText(text);
  }

  showTruncated = () => {
    this.showNext();
    this.renderNext();
    this.showMatches();
  }

  showExpanded = () => {
    this.showPrev();
    this.renderPrev();
    this.showMatches();
  }

  initListeners = () => {
    (this._SfButtonNext as HTMLButtonElement).addEventListener('click', () => {
      this.showExpanded();
    });
    (this._SfButtonPrev as HTMLButtonElement).addEventListener('click', () => {
      this.showTruncated();
    });
  }

  loadMode = async () => {
    this.initListeners();
    this.showTruncated();
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {

    this.loadMode();

  }

  override connectedCallback() {
    super.connectedCallback()
  }

  override render() {

    return html`
          
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
      <div part="highlight-container" class="SfIElasticTextC d-flex align-center">
        <div id="div-highlight-count" part="highlight-count"></div>
      </div>
      <div part="text-container" class="SfIElasticTextC d-flex align-center">
        <div id="div-text" part="text-view">${this.text}</div>
        <span part="text-next" id="button-next" class="material-symbols-outlined cursor color-lt-gray">expand_circle_right</span>
        <span part="text-prev" id="button-prev" class="material-symbols-outlined cursor color-lt-gray">arrow_circle_left</span>
      </div>

    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'sf-i-elastic-text': SfIElasticText;
  }
}
