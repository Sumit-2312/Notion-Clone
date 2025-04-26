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

----------------------------------------------------------------------------------------------------------------------
 
Problem with handleDelete Function Execution
Jab tu "Delete" button click karta hai, handleDelete function execute hota hai.

handleDelete function ka kaam hai, selected page (is case mein "Daily Logs" page) ko remove karna, aur uske children ko bhi recursively delete karna.

tsx
Copy code
const handleDelete = () => {
  // Call the deletePageRecursive function with the pages and the pageId of the page to be deleted
  deletePageRecursive(Pages, page.id); 
}
deletePageRecursive(Pages, page.id)
Yahaan pe Pages wo array hai jo current pages ko represent karta hai (initially jo samplePages hai).

page.id vo ID hai jise tu delete karna chahta hai. Jab tu "Daily Logs" pe click karta hai, to page.id "2-1" hoga.

So, deletePageRecursive ko Pages (all pages) aur page.id = "2-1" (Daily Logs) pass hote hain.

2. Inside deletePageRecursive Function
tsx
Copy code
const deletePageRecursive = (pages: Page[], pageIdToDelete: string): Page[] => {
  return pages
    .filter((page) => page.id !== pageIdToDelete)  // Remove the page with the ID to delete
    .map((page) => {
      // If page has children, recursively delete from children too
      if (page.children && page.children.length > 0) {
        return { ...page, children: deletePageRecursive(page.children, pageIdToDelete) };
      }
      return page;  // If no children, return the page as is
    });
};
pages.filter(): Is step mein, hum pages ko filter karte hain taaki us page ko remove kar sakein jiska ID delete karna hai (yani "2-1").

Filter Process: Har page ka id check hota hai. Agar page ka id match nahi karta (i.e., "2-1"), to wo page resultant array mein add hota hai.

Agar page ka id match karta hai, to wo page remove kar diya jata hai.

map(): Agar page ke paas children hain (yani nested pages hain), to hum recursively delete karne ke liye deletePageRecursive function ko children pe call karte hain.

Agar page ke paas children nahi hain, to wo page waise ka waise hi return ho jata hai.

3. Flow with Pages:
Let's dry run the flow:

handleDelete call: Jab tu "Daily Logs" page pe click karta hai, handleDelete function run hota hai.

Initial call to deletePageRecursive(Pages, "2-1") (where Pages is the list of all pages and "2-1" is the page to delete).

Filtering Pages: The first step inside deletePageRecursive is to filter out the page with id === "2-1".

For Project Alpha page (id = "1"), it doesn't match "2-1", so it is included in the new filtered array.

For Notes page (id = "2"), it doesn't match "2-1", so it is also included in the new filtered array.

Checking for Children:

When filtering the pages, after the filtering process, we go into mapping each page.

For Notes (id = "2"):

It has children, so we go into its children.

Inside children: The child with id = "2-1" is removed because it matches the id to delete ("2-1").

The remaining pages after filtering out "2-1":

js
Copy code
[{ id: "2-1-1", pageName: "2024-04-21.md", children: [], closed: true }, { id: "2-1-2", pageName: "2024-04-22.md", children: [], closed: true }]
So "Daily Logs" and its children are deleted.