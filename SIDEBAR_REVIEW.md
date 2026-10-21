# OSidebar → ODrawer Review

Findings for [Sidebar.vue](packages/oruga/src/components/sidebar/Sidebar.vue), compared against `ODialog` and `OModal`.
Breaking changes are allowed. Work through the open items one at a time and tick them off.

## Status

- **Decision:** instead of patching Sidebar, a new component **Drawer** ([drawer/](packages/oruga/src/components/drawer/)) was copied from it and rebuilt on the native `<dialog>` element (D1 = Option A). Sidebar itself is untouched.
- **Current Drawer design:** the `<dialog>` is the panel, the overlay is its native `::backdrop`. `overlay` → `showModal()`, otherwise `show()`. Escape and outside click go through the native `cancel` event (`closedby`).
- **Animation:** Drawer uses the Web Animations API composable `useAnimationsAPI` from branch `feat/dialog/animation-api` (see B4, F9).
- **Refactored by you after the first rebuild:** `inline`, `mobile`, `fullheight` and `fullwidth` were removed, `fullscreen` was added, and `v-show` was dropped from the dialog.
- **Not verified:** nothing has been run (tests, type-check, lint). `node_modules` is Windows-only in the WSL environment. All "resolved" items below are resolved in code only.
- **In sync with the refactor:** examples, inspector, unit and axe tests, `examples/index.md`, and the hand-edited generated files (`config.d.ts`, `Drawer.md`; `npm run gen` will replace them).
- **End-of-task pass (all at the end, on the Windows side):** `npm run gen`, prettier, eslint, `vue-tsc`, `npx vitest run src/components/drawer`.

Legend: 🔴 bug / regression · 🟠 a11y or behaviour gap · 🟡 API / consistency

---

## Next up

1. ~~F1~~ — done (see B4)
2. ~~F2–F5~~ — done
3. ~~P1, A7, P6~~ — done
4. ~~G2, A8, P5~~ — done
5. ~~B2~~ — done
6. ~~G1~~ — done
7. ~~T1, T2~~ — done (tests not run yet, `npm run gen` pending)
8. **F7 / F8 / F9 / F10** — theme, fate of Sidebar, animation branch, Dialog follow-ups (own review file)

---

## 0. Direction

- [x] **D1 — Native `<dialog>` vs. patching the current `<div>`** → native `<dialog>`, as a new `Drawer` component.

---

## A. Accessibility

- [x] 🔴 **A1 — `role="dialog"` + `aria-modal="true"` always present, even when closed** → removed; the native `<dialog>` carries the semantics and is only exposed while open.
- [x] 🟠 **A2 — Inline sidebar announced as a dialog** → `inline` was removed from Drawer, so the case no longer exists. If an inline panel is needed, it is a plain `<aside>` outside of this component.
- [x] 🔴 **A3 — Focus never moves into the sidebar** → `showModal()` / `show()` moves focus natively.
- [x] 🔴 **A4 — Escape doesn't work right after opening** → native close request, no focus needed inside.
- [x] 🟠 **A5 — Escape uses `keyup`** → no key handling at all; the native `cancel` event respects nested dialogs and popovers.
- [x] 🟠 **A6 — Focus not restored on close** → native `dialog.close()` restores it (requires F1 to be fixed so `close()` actually runs).
- [x] 🟠 **A7 — No accessible name** → added `ariaLabel` and `ariaDescribedby` props, bound to the `<dialog>` like in `ODialog`. `aria-labelledby` via a title comes with G2.

- [x] 🟠 **A8 — No built-in close button** → `closeable` renders the shared `CloseButton` in the header (with `closeIcon`, `closeIconSize`, `iconPack`, `ariaCloseLabel` and the `close` slot).

- [x] 🟠 **A9 — The overlay is focusable** → no overlay element anymore (`::backdrop`).
- [x] 🟠 **A10 — Modality without an overlay is inconsistent** → no overlay means non-modal `show()`; no manual `aria-modal` or focus trap. The `trapFocus` prop was removed.

---

## B. Transition

- [x] 🔴 **B1 — `position="bottom"` animates in the wrong direction** → `right` and `bottom` are both inverted in `transitionName`.
- [x] 🟠 **B2 — The `::backdrop` is not animated** → `useAnimationsAPI.play(el, name, opening, withBackdrop?)` has a new opt-in argument. Drawer passes `props.backdrop`, so a modal drawer fades its `::backdrop` in and out with the same duration and easing as the slide.
    - **How:** a second animation on `{ pseudoElement: "::backdrop" }` with a single keyframe `{ opacity: 0 }`, so it fades from / to whatever the theme defines (a fixed `0 → 1` would override a theme backdrop opacity). The interrupt / reverse and cancel logic mirrors both animations.
    - **Fallback:** if the browser throws for the pseudo-element, the element animation still plays and the backdrop just appears and disappears instantly. Whether the target browsers support animating `::backdrop` through `animate()` still needs a check.
    - **Default off:** callers which do not pass the flag (e.g. Dialog today) behave as before. See D14 in [DIALOG_REVIEW.md](DIALOG_REVIEW.md).

- [x] 🟠 **B3 — Reuses the generic `slide-*` animations built for carousels and steps** → no theme `slide-*` classes are used anymore; the presets animate `transform` only, so the panel keeps its size.

- [x] 🟡 **B4 — Transition approach** → neither option: Drawer uses the Web Animations API via `useAnimationsAPI`, like `ODialog` on `feat/dialog/animation-api`.
    - `<transition>`, `transitionName` and the `slide-*` theme classes are gone; `animation` is now `AnimationName | false` (default: slides in from the `position` edge).
    - New presets added to the composable: `slide-from-left`, `slide-from-right`, `slide-from-top`, `slide-from-bottom` (full-edge `translate`, 250ms). The existing `slide-up` / `slide-down` only nudge by 8px, so they were not reused.
    - Flow as in Dialog: play on open, intercept the native `cancel`, play the leave animation, then call the real `dialog.close()`. A reopen during the leave reverses the animation (`isClosing` guard). Reduced motion and missing `animate()` close immediately.
    - The initial open on mount is not animated.

---

## C. Behaviour / Reactivity

- [x] 🔴 **C1 — Opening click may close the sidebar immediately** → no document click listener anymore; native light dismiss.
- [x] 🔴 **C2 — Outside-click listener based on props read once at setup** → `closedby` is a reactive attribute.
- [x] 🟠 **C3 — The scroll lock can be left on** → the watcher tracks `isActive && overlay`.
- [x] 🟡 **C4 — `clickedOutside` logic hard to follow** → removed.
- [ ] 🟡 **C5 — `useTeleport(props.teleport)` and `useMatchMedia(props.mobileBreakpoint)` receive plain values, not refs or getters, so they never update** (Dialog has the same pattern)

---

## D. Props / API

- [x] 🟡 **P1 — Align prop names with `ODialog`** → renamed `overlay` → `backdrop`, `closeOnOutside` → `closeOnBackdrop`, `clipScroll` → `blockScroll`.
    - **Defaults unchanged:** `backdrop: false`, `closeOnBackdrop: true`, `blockScroll: false`. `ODialog` defaults `backdrop` and `blockScroll` to `true`; Drawer keeps its non-modal default.
    - **Note on `blockScroll`:** like in `ODialog`, the value is passed on as the `clipScroll` argument of `usePreventScrolling`, so `false` still locks the scroll (keeps the scrollbar, sets `position: fixed` on the body) and `true` clips it. The name promises more than it does, in both components.

- [x] 🟡 **P2 — `fullheight` / `fullwidth`** → removed; the drawer spans its edge and `fullscreen` was added. A `size` / `width` prop like Dialog's is still an option.
- [x] 🟡 **P3 — `mobile` values are inconsistent** → `mobile` prop removed. `mobileClass` and `mobileBreakpoint` remain.
- [x] 🟡 **P4 — `inline` makes most other props meaningless** → `inline` removed.
- [x] 🟡 **P5 — Missing props** → `ariaLabel`, `ariaDescribedby` (A7), `closeable` and its icon props (A8), and `ariaLabelledby` (set automatically from the title, G2) are done.
    - **Not added:** `autoFocus`. The native modal already focuses the first focusable element (the close button when `closeable`); `autofocus` on a child element overrides it. The footer buttons of `ODialog` set `autofocus`; Drawer does not.

- [x] 🟡 **P6 — `close` event signature** → switched to the Dialog style.
    - **Events:** `close: [event: Event, value?: string]` is emitted when the dialog has actually closed (after the leave animation), and `cancel: [event: Event, value?: string]` when the user wishes to dismiss it (Escape, light dismiss). `confirm` follows with G2.
    - **API:** `close(returnValue?: string)` in the default slot and via `defineExpose`. Non-string values (e.g. an event from `@click="close($event)"`) are ignored. `active` / `update:active` now change when the dialog has closed, so `o-drawer--active` and the scroll lock stay until the leave animation is finished.
    - **Unlike Dialog:** `cancel` is only emitted for user dismissals, not for `close()` calls, and the return value is kept by the component, because `requestClose(value)` does not keep it when `cancel` is prevented.
    - **Programmatic:** the injected component can still `$emit('close', 'value')`; only strings are forwarded. `onClose` gets `(event, value)`. The factory options type mirrors Dialog's.
    - **Breaking:** the old `CloseEventArgs` payload (e.g. `{ action: 'ok' }`) is no longer passed through.

---

## E. Tests & Docs

- [x] 🟠 **T1 — Tests** → written, **never run yet** (`npx vitest run src/components/drawer` on the Windows side).
    - **Unit** (`drawer.unit.test.ts`): render and classes (active, teleport, mobile, override, custom class props), header / body / footer, all slots and their `close` / `confirm` bindings, footer buttons (disabled, variants, position, arrow-key focus), injected component (props, events, close value), return values (close, cancel, reset on reopen), reopen, `closedby` table (incl. fullscreen), close / cancel events, modality, teleport, resizable (handle, aria, keyboard, pointer, pointer capture, cancel, limits, reset), animation (presets, override, off, backdrop, reverse, double close), reduced motion, scroll lock (incl. `blockScroll`, unmount).
    - **Programmatic:** mounting, target, custom component, close value, header / footer props, modal, accessible name, `closeAll`.
    - **Axe:** closed, base, modal, right, header / body / footer, loading, bottom with description, resizable, fullscreen.
    - **Composable:** `useAnimationsAPI.test.ts` incl. the edge presets and `withBackdrop`.
    - **Known conflict:** the test "does not emit close when unmounting an open drawer" fails with the current `Drawer.vue`: `onClose` has no unmount guard anymore, and the jsdom `close()` mock fires `close` synchronously during `onBeforeUnmount`. In a browser the event fires after the unmount and is ignored by Vue, but with the programmatic API an external `close()` would call the wrapper's close twice in jsdom. Decide: restore the `isUnmounting` guard (recommended) or drop the test.
    - **Not covered:** drag with a real layout, real `closedby` light dismiss, focus restore on close, `::backdrop` animation in a real browser (all need the browser project, `*.browser.test.ts`).

- [x] 🟡 **T2 — Docs** → done, except regenerating the generated files.
    - Examples for all features, `examples/index.md` updated (see F5), the doubled "composable. composable." fixed.
    - **Accessibility:** the docs follow the convention of the other components (inline `::: info Accessibility Note:` blocks, no separate heading). Notes were added to Base (native dialog, accessible name), Header / body / footer (`aria-labelledby`, `ariaDescribedby`, `ariaCloseLabel`), Loading (status role, `loadingLabel`), Closing (modal vs. non-modal, focus), Animation (reduced motion), Resizable (separator, `ariaResizeLabel`) and Programmatically.
    - **Limitations (F6):** documented as a `::: warning Browser support:` block in the Closing section (`closeOnBackdrop` needs `closedby`, no outside area in fullscreen, escape with `closeOnBackdrop` in `closedby` browsers).
    - **Still to do on the Windows side:** `npm run gen` regenerates `Drawer.md` (it does not list the new props, slots, events and the changed `animation` type yet) and `config.d.ts`.

---

## F. Found while rebuilding the Drawer

- [x] 🔴 **F1 — The drawer never closes** → fixed by the animation flow in B4: `isActive=false` now runs `leave()`, which closes the dialog after the animation (or immediately when nothing can be animated). A6 works with it.

- [x] 🟡 **F2 — Duplicate `mobileClass` entry** → removed the second entry in `defineClasses`.

- [x] 🟡 **F3 — Stale `inlineClass`** → removed from `DrawerClasses`, the inspector, `config.d.ts`.

- [x] 🟡 **F4 — Stale comments and trivial wrapper** → `isModal` replaced by `props.overlay`, comments fixed. The `instanceof` check in `getDialog` stays as a guard until the component is mounted.

- [x] 🟠 **F5 — Sync with the refactor**
    - **Examples:** `base.vue` (now with a `fullscreen` switch), `component.vue`, `teleport.vue` and `programmatically.vue` no longer use removed props; `inline.vue` and its section in `examples/index.md` were removed; the inspector lost `inlineClass`, `fullheightClass`, `fullwidthClass` and `mobileLayoutClass` and gained `fullscreenClass`.
    - **Tests:** the `inline` cases were removed, `fullscreen` was added, and the `isVisible()` / `transition` stub assumptions (from `v-show`) were dropped. The axe test has a `fullscreen` case instead of `inline`.
    - **Generated:** `config.d.ts` and `Drawer.md` were edited by hand to match; regenerate with `npm run gen`.

- [x] 🟡 **F6 — Known limitations to document** → documented in the Closing section of the docs (browser support warning). The programmatic point (no exit animation when the factory closes the drawer) is not mentioned there yet.
    - `closeOnOutside` needs a browser with `closedby` support (same as Dialog).
    - In browsers that support `closedby`, `closeOnEscape=false` does not block Escape while `closeOnOutside` is on.
    - Programmatic close destroys the component on a timer, so there is no exit animation in that path (same as Sidebar).

- [ ] 🟠 **F7 — No theme styles**

    No `_drawer.scss` exists in the separate `@oruga-ui/theme-*` packages. Drawer renders unstyled in the docs. It needs `::backdrop`, edge positioning and the slide styles.

- [ ] 🟡 **F8 — Fate of Sidebar**

    Decide whether Sidebar gets deprecated in favour of Drawer or stays as is. Its uncommitted changes (`role="dialog"`, `aria-modal`, removed `isAnimated`) are still in the working tree and introduce A1 and C1.

---

## G. Feature enhancements

- [x] 🟡 **G1 — `resizable` prop: let the user resize the drawer** → implemented in [Drawer.vue](packages/oruga/src/components/drawer/Drawer.vue).
    - **Props:** `resizable` and `ariaResizeLabel` (default "Resize"). No effect with `fullscreen`. There are no `minSize` / `maxSize` props: the limits come from the CSS `min-*` / `max-*` size of the drawer, bounded by the viewport, with a floor of 100px so the handle can never disappear.
    - **Handle:** an element at the end of the dialog (`o-drawer__resize-handle`), shown only when resizable. Positioning and cursor are theme work (F7).
    - **Pointer:** pointer events with pointer capture on the handle (`touch-action: none` inline, needed for touch). The capture keeps a drag that ends outside the panel from being a light dismiss; this still needs a check in a real browser.
    - **Keyboard and a11y:** `role="separator"`, `tabindex="0"`, `aria-orientation` (vertical for left / right, horizontal for top / bottom), `aria-valuenow` / `min` / `max`. Arrow keys resize by 10px (50px with Shift) in the direction of the position, `Home` / `End` jump to the limits.
    - **Size:** applied as an inline `width` (left / right) or `height` (top / bottom); the theme's `max-*` keeps applying. The size is kept when the drawer is closed and reopened, and reset when `position` changes or `resizable` is turned off.
    - **Event:** `resize` with the new size in px, emitted on every change.
    - **Classes:** `resizableClass`, `resizingClass` (while dragging), `resizeHandleClass`.
    - **Not done:** no `v-model:size`.
    - **Not synced by hand:** `Drawer.md` (`npm run gen`); `config.d.ts` was updated.

- [x] 🟡 **G2 — Structured content template like `ODialog` (header, body, footer)** → implemented in [Drawer.vue](packages/oruga/src/components/drawer/Drawer.vue), opt-in like Dialog, markup duplicated for now.
    - **Header** (when `title`, `subtitle`, `closeable` or a header slot is used): `title`, `subtitle`, `closeable` with the icon props; slots `header`, `title`, `subtitle`, `close`. The title is linked via `aria-labelledby` on the dialog (`useId()`).
    - **Body** (when there is a default / content slot, `component` or `content`): `content` prop; slots `default` and `content`; the `component` / `props` / `events` path is unchanged.
    - **Footer** (when a button prop or the `footer` slot is used): `confirmButton`, `cancelButton`, `confirmVariant`, `cancelVariant`, `disableConfirm`, `disableCancel`, `buttonPosition`, `closeOnConfirm`; slots `footer`, `confirmButton`, `cancelButton`; event `confirm`. The cancel button closes with the value `"cancel"`, `closeOnConfirm` with `"confirm"`. The slots receive `close` and `confirm`, and both are exposed.
    - **Classes:** `headerClass`, `titleClass`, `subtitleClass`, `closeClass`, `bodyClass`, `footerClass`, `footerPositionClass`, `confirmButtonClass`, `cancelButtonClass` (the typo `confirmButtunClass` of `DialogClasses` was not copied).
    - **Breaking:** content now sits in an `o-drawer__body` element instead of directly in the dialog.
    - **Loading:** `loading` and `loadingLabel` like Dialog: an `OLoading` (not full page) between body and footer, and the loading state on the confirm button.
    - **Deliberate difference:** no `image` slot, and the title is an `h1` / `h2` like in Dialog.
    - **Still open:** sharing the markup with Dialog (wait until `feat/dialog/animation-api` is merged, see F9), and `DialogClasses.confirmButtunClass` is still misspelled in Dialog.
    - **Not synced by hand:** the new props, slots and events are not yet in `Drawer.md`; `npm run gen` will generate them (`config.d.ts` was updated by hand because `getDefault` is typed from it).

- [ ] 🟠 **F9 — Dependency on `feat/dialog/animation-api`**

    `useAnimationsAPI.ts` and its test were copied verbatim from that branch into the working tree, together with the small supporting changes (`prefersReducedMotion` in `utils/helpers.ts`, the `AnimationName` export in `types/index.ts`, the export in `composables/index.ts`). They are not committed.
    On top of that, four `slide-from-*` presets, the `withBackdrop` argument (B2) and tests were added to the composable, so merging the branch will conflict in `useAnimationsAPI.ts` and its test.
    The `Element.animate` mock was also copied from the branch's `src/__tests__/vitest.setup.ts` (without its `requestClose` mock, which only Dialog needs). It makes animations play in every jsdom test, so the Drawer tests which are not about animations set `animation: false`.
    - **Decide:** merge that branch first and rebase this work onto it, or land the composable together with Drawer.
    - The same branch also rewrites `Dialog.vue`; sharing the header / footer markup between Dialog and Drawer should be done after it is merged.

- [ ] 🟡 **F10 — Dialog follow-ups** → moved to [DIALOG_REVIEW.md](DIALOG_REVIEW.md) (return value lost on animated close, `draggable` vs. the animation transform, `confirmButtunClass` typo, title as `aria-labelledby`, the `closedby` fallback for `closeOnEscape`, and more).
