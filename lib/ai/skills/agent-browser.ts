/**
 * Agent-browser skill documentation for the web automation system prompt.
 * This provides comprehensive guidance on using agent-browser commands.
 *
 * @see https://agent-browser.dev/commands
 * @see https://www.kernel.sh/docs/integrations/agent-browser
 */
export const agentBrowserSkill = `
# Browser Automation with agent-browser

## Core Workflow
1. Navigate: Use browser tool with "open <url>"
2. Snapshot: Use browser tool with "snapshot" to see accessibility tree with element refs
3. Interact: Use refs from snapshot (@e1, @e2) to click, fill, etc.
4. Re-snapshot: After navigation or DOM changes to get updated refs

## Navigation & Basic Interaction
- "open <url>" - Navigate to URL (aliases: goto, navigate)
- "click @e1" - Click element by ref
- "dblclick @e1" - Double-click element
- "fill @e1 \\"text\\"" - Clear field and fill with text
- "type @e1 \\"text\\"" - Type into element (appends to existing)
- "press Enter" - Press key (Tab, Escape, ArrowDown, Control+a, etc.)
- "hover @e1" - Hover over element
- "select @e1 \\"value\\"" - Select dropdown option by value or text
- "check @e1" / "uncheck @e1" - Toggle checkbox state

## Information Retrieval
- "snapshot" - Full accessibility tree with element refs (@e1, @e2, etc.)
- "get text @e1" - Get text content of element
- "get value @e1" - Get input field value
- "get html @e1" - Get innerHTML of element
- "get attr @e1 href" - Get specific attribute value
- "get url" - Get current page URL
- "get title" - Get page title
- "get count @e1" - Count matching elements
- "get box @e1" - Get bounding box coordinates

## State Checks
- "is visible @e1" - Check if element is visible
- "is enabled @e1" - Check if element is enabled
- "is checked @e1" - Check checkbox/radio state

## Semantic Finding (Alternative to Refs)
When refs are ambiguous or you need to find elements by semantic meaning:
- "find role button click --name \\"Submit\\"" - Find by ARIA role and name
- "find text \\"Sign In\\" click" - Find by visible text content
- "find label \\"Email\\" fill \\"test@test.com\\"" - Find by associated label
- "find placeholder \\"Enter email\\" fill \\"user@example.com\\"" - Find by placeholder
- "find testid \\"login-btn\\" click" - Find by data-testid attribute
- "find first @e1 click" - Click first matching element
- "find nth 2 @e1 click" - Click nth matching element (1-indexed)

## Waiting
- "wait @e1" - Wait for element to appear in DOM
- "wait 2000" - Wait specified milliseconds
- "wait --text \\"Welcome\\"" - Wait for text to appear on page
- "wait --url \\"**/dashboard\\"" - Wait for URL to match pattern
- "wait --load networkidle" - Wait for network activity to settle
- "wait --fn \\"document.readyState === 'complete'\\"" - Wait for JS condition
- "wait --download" - Wait for download to complete

## Scrolling
- "scroll down 500" - Scroll down 500 pixels
- "scroll up 300" - Scroll up 300 pixels
- "scroll left 200" - Scroll left
- "scroll right 200" - Scroll right
- "scrollintoview @e1" - Bring element into viewport (implicit in most interactions)

## Browser Navigation
- "back" - Go back in history
- "forward" - Go forward in history
- "reload" - Refresh current page

## Screenshots
- "screenshot page.png" - Capture current viewport
- "screenshot --full page.png" - Capture full page (scrolls)

## Tab Management
- "tab" - List open tabs
- "tab new https://example.com" - Open new tab with URL
- "tab 2" - Switch to tab number 2
- "tab close" - Close current tab

## Frame Handling
- "frame @e1" - Switch to iframe element
- "frame main" - Return to main frame

## Storage & Cookies
- "cookies" - List all cookies
- "cookies set name value" - Set a cookie
- "cookies clear" - Clear all cookies
- "storage local" - List localStorage
- "storage local key" - Get specific localStorage value
- "storage local set key value" - Set localStorage value

## Form Workflow Example
1. browser({ command: "open https://example.com/apply" })
2. browser({ command: "snapshot" })
   → Output: textbox "First Name" [ref=@e1], textbox "Last Name" [ref=@e2],
             textbox "Email" [ref=@e3], combobox "State" [ref=@e4], button "Submit" [ref=@e5]
3. browser({ command: "fill @e1 \\"John\\"" })
4. browser({ command: "fill @e2 \\"Doe\\"" })
5. browser({ command: "fill @e3 \\"john.doe@email.com\\"" })
6. browser({ command: "click @e4" }) // Open dropdown
7. browser({ command: "snapshot" }) // Get dropdown options
8. browser({ command: "select @e4 \\"California\\"" })
9. browser({ command: "snapshot" }) // Verify before submit

## Important Notes
- ALWAYS run "snapshot" after opening a page or after significant navigation/DOM changes
- Element refs (@e1, @e2) are stable within a snapshot but change after DOM updates
- Use "wait" commands to ensure page is ready before interacting
- For dropdowns, click to open first, then snapshot to see options, then select
- Quote strings with spaces: fill @e1 \\"John Doe\\"
- For complex forms, snapshot frequently to track state changes
`;
