The **Dialog** component is a flexible and extensible content container overlaid on either the primary window or another dialog. It is based on the [HTML \<dialog\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) and can be used to create both modal and non-modal dialog boxes.
Modal dialog boxes interrupt interaction with the rest of the page being inert,
while non-modal dialog boxes allow interaction with the rest of the page.
Inert content outside an active dialog box is usually visually obscured or dimmed, making it difficult to discern.
By default, modal overlays contain their own tab sequence, preventing users from navigating outside the component.
The component implements the W3C ARIA APG [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) as well as the W3C ARIA APG [Alert and Message Dialogs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/).
