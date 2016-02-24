###flex layout: *<small>from [css tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)</small>*
*Notice 1: the first value is the default for style;
Notice 2:	Note that float, clear and vertical-align have no effect on a flex item.*
####container part
1.  `display: flex/inline-flex;`:   flex-layout can't live with block in harmony, also need mixins hack.
2.  `flex-direction: row | row-reverse | column | column-reverse`   main-axis, defining the direction flex items are placed in flex container
3.  `flex-wrap: nowrap | wrap | wrap-reverse`	default, flex items will fit in one line. change this property will allow the flex items wrap into ne w line.
4.  `flex-flow: row nowrap | <'flex-direction' || 'flex-wrap'>`	shorthand for the two given property.
5. 	`justify-content: flex-start | flex-end | center | space-between | space-around`	This defines the alignment along the main axis.  considering `space-around`: assuming s is one unit space, then A B C in one line will be sAssBssCs!  <br/>**WhenToUse:** either all items on a line is inflexible, or flexible but reached their max size.
> It also exerts some control over the alignment of items when they overflow the line.
6.	`align-items: strech | flex-start | flex-end | center | baseline`	similar to `justify-content`, but for cross axis; `strech` is default(still respect min-width/max-width); `baseline`: The item with the largest distance between its cross-start margin edge and its baseline is flushed with the cross-start edge of the line.
7.	`align-content: strech | flex-start | flex-end | center | space-between | space-around`	
>This aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.
Note: this property has no effect when there is only one line of flex items. **Used On Multi Lines**
8.	

####item part
1.	`order: <Integer>`: property order controls the order they apprear in flex container
2.	`item	flex-grow: 0 | <no negative unitless number>`   defining space proportion that flex item should take up.
>If all items have flex-grow set to 1, the remaining space in the container will be distributed equally to all children. If one of the children a value of 2, the remaining space would take up twice as much space as the others (or it will try to, at least).
3.	`flex-shrink: 1 | <no negative unitless number>`	defining the ability for a flex items to shrink if necessary.
4.  `flex-basis: auto | <length>`	length or keyword(auto..etc.)
>**This defines the default size of an element before the remaining space is distributed**. It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The auto keyword means "look at my width or height property" (which was temporarily done by the main-size keyword until deprecated). The content keyword means "size it based on the item's content" - this keyword isn't well supported yet, so it's hard to test and harder to know what it's brethren max-content, min-content, and fit-content do.
>
>If set to 0, the extra space around content isn't factored in. If set to auto, the extra space is distributed based on its flex-grow value
5.	`flex: 0 1 auto | none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`(recommended)	This is the shorthand for flex-grow, flex-shrink and flex-basis combined
6.	`align-self: <values see align-items>`

