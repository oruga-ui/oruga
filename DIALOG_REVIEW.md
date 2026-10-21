# ODialog Review

Follow-ups for [Dialog.vue](packages/oruga/src/components/dialog/Dialog.vue) found while building `ODrawer` (see [SIDEBAR_REVIEW.md](SIDEBAR_REVIEW.md)).
Breaking changes are allowed. Work through the items one at a time and tick them off.

## Status

- **Reviewed version:** the Dialog on branch `feat/dialog/animation-api` (Web Animations API via `useAnimationsAPI`), because that is where Dialog is heading. The working tree on `develop` still uses `<transition>`.
- **Not verified:** nothing was run. D1 and D2 are reasoned from the code and the Web Animations API spec and must be confirmed in a real browser first. All other items are visible in the code.
- **Timing:** all items touch `Dialog.vue`, which that branch rewrites. Do them on `feat/dialog/animation-api` or right after it is merged (see F9 in the Sidebar review) to avoid conflicts.
- **Reference implementation:** [Drawer.vue](packages/oruga/src/components/drawer/Drawer.vue) already solves D1, D4–D8 and D10 in its own way and can be used as a template.

Legend: 🔴 bug · 🟠 a11y or behaviour gap · 🟡 consistency / cleanup

## Next up

1. **D1, D2** — verify in a browser
2. **D3, D4** — typo and accessible name
3. **D5 / D6** — own `leave()` and the `closedby` fallback (best done together)
4. **D7–D11** — the rest

---

## Likely bugs (verify first)

- [ ] 🔴 **D1 — The return value is lost on an animated close**

    `close('cancel')`, the cancel button and `closeOnConfirm` (`"confirm"`) go through `requestClose(value)`.
    `onCancel` then calls `event.preventDefault()`, plays the leave animation and closes with a bare `rootRef.value?.close()`.
    As far as I know, the value passed to `requestClose()` is only applied when `cancel` is not prevented, so the `close` event would report an empty return value whenever an animation plays.
    - **Verify:** in Chrome, open a dialog with `cancel-button` and `confirm-button`, click cancel, and log the `close` event value. Expected `"cancel"`, suspected `""`.
    - **Fix:** keep the value in the component and call `rootRef.value.close(value)` after the animation (Drawer does this, see D5).
    - **Test:** `close('x')` → after the animation `dialog.returnValue === 'x'` and the `close` event carries `'x'`.

- [ ] 🔴 **D2 — `draggable` probably does not work with the default animation**

    The default `zoom-out` preset animates `transform` with `fill: "both"`, so its end state stays applied after the animation has finished.
    Animation effects override inline styles, and `draggable` moves the dialog with an inline `transform` (`dragStyle`). The drag offset would have no visible effect.
    Themes that position the dialog with `transform` are affected the same way.
    - **Verify:** open a `draggable` dialog with the default animation and drag the header. Then try `animation="fade"` (opacity only), which should work.
    - **Fix (composable):** cancel the opening animation once it has finished, so the CSS state applies again. The closing animation keeps its end state until `dialog.close()`. This needs care in `useAnimationsAPI` because of the reversal logic, and it also benefits Drawer.
    - **Alternative:** move the drag offset to the `translate` property, which composes with `transform`.

---

## Defects

- [ ] 🟠 **D3 — Typo `confirmButtunClass`**

    Misspelled in `DialogClasses` ([dialog/props.ts](packages/oruga/src/components/dialog/props.ts)), in `config.d.ts` and in the inspector example.
    The component reads `confirmButtonClass`, so the typed config key is wrong and the correct key is untyped.
    - **Fix:** rename it everywhere, then run `npm run gen`. This is a breaking change for anyone who used the misspelled key.

- [ ] 🟠 **D4 — The title is linked as description, not as the accessible name**

    The template sets `:aria-describedby="title ? titleId : ariaDescribedby"` and only `aria-label` as a naming attribute.
    A dialog with only a `title` therefore has no accessible name, and a user-set `ariaDescribedby` is ignored as soon as a title exists.
    - **Fix:** `:aria-labelledby="title || $slots.title ? titleId : undefined"` and `:aria-describedby="ariaDescribedby"`, like Drawer. Update the prop doc comment, which currently describes the old behaviour.
    - **Test:** the dialog is labelled by the title element, and `ariaDescribedby` is passed through unchanged. Check the axe test cases still pass.

- [ ] 🟠 **D5 — `closeOnEscape=false` is ignored in browsers without `closedby` support** _(was F10)_

    Drawer's `onCancel` keeps the dialog open when the browser has no `closedby` support (`supportsClosedBy`) and `closeOnEscape` is off, because such a browser ignores `closedby="none"` and always closes a modal dialog on Escape.
    Dialog's `onCancel` only emits `cancel`.
    `closeOnBackdrop` is not affected, since without `closedby` there is no light dismiss at all.
    - **Not a copy of Drawer's code:** `close()` goes through `requestClose()`, which also fires `cancel`. Blocking every cancel would block Dialog's own close button, the cancel button, and `closeOnConfirm`. See D6, which removes this problem.
    - **Check first:** the current `closedby` browser support (Chrome and Firefox have shipped it; Safari's status should be verified), to judge how many users are affected.

---

## Robustness and consistency

- [ ] 🟠 **D6 — Own `leave()` instead of `requestClose()`**

    Routing the component's own close through `requestClose()` has three downsides:
    - In browsers without `requestClose` the fallback is `close(value)`, which fires no `cancel`, so there is no leave animation at all.
    - Chrome may make a second `cancel` non-cancelable if the first one was prevented without a user activation in between, which closes the dialog without its animation.
    - It causes D1, and it is why D5 cannot simply be copied from Drawer.

    - **Fix:** like Drawer, `close(value)` and `confirm()` call a component-owned `leave(value)` (play the animation, then `dialog.close(value)`), and the native `cancel` event (Escape, light dismiss) is only the entry point for user dismissals. Then `cancel` is emitted for user dismissals only; document that difference, or keep emitting it from `leave()` with a synthetic event.
    - **Result:** D1, D5 and the missing animation in older browsers are fixed with one change.

- [ ] 🟠 **D7 — Backdrop and scroll lock are decided once**

    `hasBackdrop` is `props.backdrop || props.alert || rootRef.value?.ariaModal`. Reading the `ariaModal` property (a string or `null`) from a template ref inside a computed is not reactive and mixes types.
    The scroll lock is toggled only when `isActive` changes, so changing `backdrop` while the dialog is open leaves the lock on (the same class of bug as C3 in the Sidebar review).
    - **Fix:** a plain `isModal` computed (`backdrop || alert`), and a scroll watcher on `isActive && isModal` with `flush: "post"`, like Drawer.
    - **Decide:** whether an `aria-modal` attribute passed by the consumer should still force modality. If yes, read `$attrs` instead of the element.

- [x] 🟡 **D8 — The enter animation also plays on mount** _(decided: keep it)_

    Decided to keep the animation on mount, because programmatic dialogs are created with `active: true` and would otherwise have no open animation.

    `onMounted(() => toggleDialog(isActive.value))` plays the animation when a dialog is already active on first render. Drawer opens without animation in that case.
    - **Decide:** whether an initially active dialog should animate. If not, split `toggleDialog` into open and animate.

- [ ] 🟡 **D9 — `draggable` input handling**

    Dragging uses document-level `pointermove` / `pointerup` listeners and has no `touch-action: none` on the header, so dragging by touch scrolls the page instead.
    - **Fix:** pointer capture on the header (as in Drawer's resize handle) and `touch-action: none`. This also removes the document listeners.

- [ ] 🟡 **D10 — Non-reactive composable arguments (C5)**

    `useTeleport(props.teleport)` and `useMatchMedia(props.mobileBreakpoint)` receive plain values, so changing the props later has no effect. Pass getters or refs if the composables support it, otherwise document that these props are read once.

- [ ] 🟡 **D11 — Smaller cleanups**
    - The explicit `role="dialog"` is redundant on a `<dialog>`; only `alertdialog` needs an attribute.
    - `size`, `closeIconSize` and the button `variant` props are typed as plain `string`; unions would give better autocomplete (the theme can add values, so decide per prop).
    - `blockScroll` is passed to `usePreventScrolling` as the clip argument, so `false` still locks the scroll. The name promises more than it does (same in Drawer).
    - Header, close button and footer markup is duplicated with Drawer. Extract shared components under `components/utils` after the animation branch is merged.

- [x] 🟡 **D14 — Fade the `::backdrop` like Drawer** _(dropped)_

    Dropped: animating the `::backdrop` together with the dialog flickers. Suspected cause (not verified in a browser): themes that render their own `o-dialog__backdrop` element inside the dialog dim twice, once fading with the dialog and once with the `::backdrop`. `withBackdrop` was removed from `useAnimationsAPI` again, so Drawer needs its own solution if it wants a backdrop fade.

    The `::backdrop` of a modal dialog appears and disappears instantly while the dialog animates. `useAnimationsAPI.play()` now has an opt-in fourth argument `withBackdrop` (added for Drawer, see B2 in the Sidebar review).
    - **Fix:** pass `hasBackdrop.value` as fourth argument in the three `play(...)` calls of `Dialog.vue`.
    - **Check first:** `animate({ pseudoElement: "::backdrop" })` in the target browsers. The composable falls back to no backdrop animation if the browser throws.
    - **Note:** the backdrop animation only touches opacity, so it does not run into the transform conflict of D2.

---

## Tests and docs

- [ ] 🟠 **D12 — Tests for the items above**
    - D1: return value on an animated close (mock `animate`, resolve the animation, assert `returnValue` and the `close` event).
    - D2: no inline-transform conflict (composable test: the effect is released after the opening animation).
    - D4: `aria-labelledby` and `aria-describedby`.
    - D5 / D6: `closeOnEscape=false` in a browser without `closedby`, and the component's own close paths still work.
    - D7: scroll lock follows `backdrop` while open.
- [ ] 🟡 **D13 — Docs and generated files**
    - Regenerate `config.d.ts` and `Dialog.md` with `npm run gen` after D3 and D4.
    - Add a note to the docs that `closeOnBackdrop` needs `closedby` support.
