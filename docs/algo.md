# Notes on Algorithms

## Big O

_Definitions:_

- `Big O` is the smallest upper bound on the time complexity of an algorithm;
- `Big Omega` is the biggest lower bound on the time complexity of an algorithm;
- `Big Theta` is a tight bound on the time complexity of an algorithm;

Those can be used for time and space complexity.

_Tips_:

- Don't use constants. O(2N) == O(N) because the notation is asymptotic;
- Drop the non-dominant terms. O(N<sup>2</sup> + N) == O(N<sup>2</sup>);
- If your algorithm is in the form "do this, then, when you're all done, do that" then you add the runtimes.
- If your algorithm is in the form "do this for each time you do that" then you multiply the runtimes.
- When you see a problem where the number of elements in the problem space gets halved each time, that will likely be a O(log N) runtime.
- When you have a recursive function that makes multiple calls, the runtime will often (but not always) look like O(branches<sup>depth</sup>), where branches is the number of times each recursive call branches.

_Cases:_

Best, worst, and expected cases describe the big O (or big theta) time for particular inputs or scenarios.

### Amortized Time

Amortized analysis distributes the cost of occasional expensive operations (like resizing an array) across many cheap operations. For example, in a dynamic array, most insertions take constant time, but occasionally, an expensive resizing happens. Instead of saying that every insertion has the worst-case cost, amortized analysis shows that, on average, each insertion remains efficient. Amortized time complexity is useful for algorithms where the cost of operations can vary but expensive operations are rare.
