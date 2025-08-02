The **Listbox** component presents a list of options and allows a user to select one or more of them.
The component implements the W3C ARIA APG [Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).
When assistive technologies present a listbox, the name of an option is calculated by the browser as a flat string.
Therefore, the content of an option should not contain any semantic information, such as a heading.
In addition, assistive technologies does not provide an accessible way to present a list of interactive elements for the listbox role, such as links, buttons, or checkboxes.
