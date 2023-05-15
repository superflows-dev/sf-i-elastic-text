/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
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
export declare class SfIElasticText extends LitElement {
    text: string;
    minLength: number;
    static styles: import("lit").CSSResult;
    _SfIEventsC: any;
    _SfButtonNext: any;
    _SfButtonPrev: any;
    _SfDivText: any;
    constructor();
    truncate: (str: string, n: number, useWordBoundary: boolean) => string;
    showNext: () => void;
    showPrev: () => void;
    renderNext: () => void;
    renderPrev: () => void;
    showTruncated: () => void;
    showExpanded: () => void;
    initListeners: () => void;
    loadMode: () => Promise<void>;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-elastic-text': SfIElasticText;
    }
}
//# sourceMappingURL=sf-i-elastic-text.d.ts.map