Storyset to generate the svg's


**Document: Debugging and Enhancing Page Component Functionality**

---

### Problem 1: **Selected Page Not Highlighting Properly**

**Issue:**
Initially, the `selected` state was managed inside each `PageItem` component individually, causing each instance to maintain its own selection, rather than sharing a global selected state.

**Symptoms:**
- Only one nested `PageItem` appears selected.
- Selecting one page does not deselect others.

**Solution:**
- Lifted `selected` state up to `PagesComponent`.
- Passed `selected` and `setSelected` as props down to every `PageItem`.

**Why This Approach:**
- Shared state across multiple components must be **lifted up**.
- React requires controlled state in a common ancestor to keep it consistent across the tree.

---

### Problem 2: **Toggling Open/Close Not Updating State**

**Issue:**
Clicking the Chevron icon to expand/collapse was not updating the component visually.

**Root Cause:**
- The state update for `closed` was not propagating correctly because we weren't using `setPages` recursively.

**Solution:**
- Created a `togglePageState` recursive function to walk through the nested tree structure and update the `closed` property correctly.

**Why This Approach:**
- The page tree is hierarchical; only recursion can properly traverse and update nested elements.

---

### Problem 3: **Adding a New Page Only Works at Top Level**

**Issue:**
When adding a page, it only got added to the first-level parent (top-level page).

**Root Cause:**
- The map function was only looping over `Pages`, not checking nested `children`.

**Solution:**
- Wrote a `addPageById` recursive function that:
  - Searches for the matching `selectedId`.
  - Adds the new page to its `children`.

**Why This Approach:**
- Since pages can be deeply nested, we need to recursively walk the tree to find the match.
- Returning a new tree structure ensures **immutability**, so React correctly re-renders.

---

### Problem 4: **Handling Empty Children When Adding Pages**

**Issue:**
- If a selected page had no `children`, the new child addition threw an error.

**Root Cause:**
- `children` could be `undefined`.

**Solution:**
- Used the spread operator with fallback:
  ```ts
  children: [...(page.children || []), newChild]
  ```

**Why This Approach:**
- Ensures that the `children` property is always an array before adding a new element.

---

### Summary of Key Learnings

1. **Lift State Up** when multiple components need to share a single state.
2. **Use Recursion** when dealing with nested or tree-like structures.
3. **Immutability is Crucial** for React state updates to reflect changes in the UI.
4. **Fallback Handling** like `page.children || []` prevents runtime errors.
5. Always debug state issues with **console logs** or **React DevTools** to inspect tree structure.

---

This process involved breaking problems down, understanding React's state flow, and applying known principles like recursion and immutability to solve them in a logical, layered way.

