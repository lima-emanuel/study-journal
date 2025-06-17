# Notes on Go

## Basics

### Packages

Programs start running in package `main`. Syntax for imports is:

```go
import (
    "fmt"
    "math/rand"
)
```

the `math/rand` package comprises files that begin with the statement `package rand`.

A name is exported if it begins with a capital letter. For example, Pi is an exported name, which is exported from the `math` package. Usage like so:

```go
import (
    "fmt"
    "math"
)

func main() {
    fmt.Println(math.Pi)
}
```

### Functions

f

Syntax:

```go
func add(x int, y int) int {
    return x + y
}
```

When two or more consecutive named function parameters share a type,
you can omit the type from all but the last. So it becomes:

```go
func add(x, y int) int {
    return x + y
}

// Using:
func main() {
    fmt.Println(add(42, 13))
}
```

A function can return any number of results:

```go
func swap(x, y string) (string, string) {
    return y, x
}

// Using:
func main() {
    a, b := swap("hello", "world")
}
```

Return values may be named. If so, they are treated as variables defined at the top of the function. A return statement without arguments returns the named return values. This is known as a "naked" return.

```go
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
}
```

### Types

`var` statement declares a list of variables; as in function argument lists, the type is last. A `var` statement can be at package or function level.

```go
import "fmt"

var c, python, java bool

func main() {
    var i int
    fmt.Println(i, c, python, java)
}
```

A `var` declaration can include initializers, one per variable. If an initializer is present, the type can be omitted; the variable will take the type of the initializer.

```go
var i, j int = 1, 2

func main() {
    var c, python, java = true, false, "no!"
    fmt.Println(i, j, c, python, java)
}
```

Inside a function, the `:=` short assignment statement can be used in place of a var declaration with implicit type. Outside a function, every statement begins with a keyword and so the `:=` construct is not available.

```go
func main() {
    var i, j int = 1, 2
    k := 3
    c, python, java := true, false, "no!"

    fmt.Println(i, j, k, c, python, java)
}
```

Basic types:

```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point

float32 float64

complex64 complex128
```

Can also be initialized like so:

```go
import (
    "fmt"
    "math/cmplx"
)

var (
    ToBe   bool       = false
    MaxInt uint64     = 1<<64 - 1
    z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func main() {
    fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe)
    fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt)
    fmt.Printf("Type: %T Value: %v\n", z, z)
}
```

Variables declared without an explicit initial value are given their zero value. The zero value is:

- `0` for numeric types,
- `false` for the boolean type, and
- `""` (the empty string) for strings.

Assignment between items of different type requires an explicit conversion:

```go
i := 42
f := float64(i)
u := uint(f)
```

Constants are declared like variables, but with the const keyword. They can be character, string, boolean, or numeric values. Constants cannot be declared using the := syntax.

```go
const Pi = 3.14

func main() {
    const World = "世界"
    fmt.Println("Hello", World)
    fmt.Println("Happy", Pi, "Day")

    const Truth = true
    fmt.Println("Go rules?", Truth)
}
```

A pointer holds the memory address of a value.

```go
// Type *T is a pointer to a T value. Its zero value is nil.
var p *int

// The & operator generates a pointer to its operand.
i := 42
p = &i

// The * operator denotes the pointer's underlying value.
// This is known as dereferencing.
fmt.Println(*p) // read i through the pointer p
*p = 21         // set i through the pointer p
```

Structs:

```go
type Vertex struct {
    X int
    Y int
}

var (
    v1 = Vertex{1, 2}  // has type Vertex
    v2 = Vertex{X: 1}  // Y:0 is implicit
    v3 = Vertex{}      // X:0 and Y:0
    p  = &Vertex{1, 2} // has type *Vertex
)

func main() {
    v := Vertex{1, 2}
    v.X = 4
    fmt.Println(v.X)
}
```

Struct fields can be accessed through a struct pointer:

```go
type Vertex struct {
    X, Y int
}

func main() {
    v := Vertex{1, 2}
    p := &v // p is a pointer to v
    p.X = 1e9 // dereferencing here
    fmt.Println(v.X)
}
```

The type `[n]T` is an array of `n` values of type `T`:

```go
var a [2]string
a[0] = "Hello"
a[1] = "World"

primes := [6]int{2, 3, 5, 7, 11, 13}
```

An array's length is part of its type, so arrays cannot be resized.

A slice is a dynamically-sized, flexible view into the elements of an array:

```go
primes := [6]int{2, 3, 5, 7, 11, 13}

// The type []T is a slice with elements of type T.
// A slice is formed by specifying two indices, a low and high bound, separated by a colon.
// This includes the first element, but excludes the last one.
var s []int = primes[1:4]

// Changing the elements of a slice modifies the corresponding elements of its underlying array.
// Other slices that share the same underlying array will see those changes.
```

Slice literals build and array literal and reference it:

```go
q := []int{2, 3, 5, 7, 11, 13}

r := []bool{true, false, true, true, false, true}

s := []struct {
    i int
    b bool
}{
    {2, true},
    {3, false},
    {5, true},
    {7, true},
    {11, false},
    {13, true},
}
```

When slicing, you may omit the high or low bounds to use their defaults instead. The default is zero for the low bound and the length of the slice for the high bound.

A slice has both a length and a capacity. The length of a slice is the number of elements it contains. The capacity of a slice is the number of elements in the underlying array, counting from the first element in the slice. The length and capacity of a slice s can be obtained using the expressions `len(s)` and `cap(s)`.

```go
s := []int{2, 3, 5, 7, 11, 13}

// Slice the slice to give it zero length.
s = s[:0]

// Extend its length.
s = s[:4]

// Drop its first two values.
s = s[2:]
```

The zero value of a slice is nil. A `nil` slice has a length and capacity of 0 and has no underlying array.

### Control Flow

`For` is the only loop available:

```go
func main() {
    sum := 0
    for i := 0; i < 10; i++ {
        sum += i
 }
 fmt.Println(sum)
}

// Or

func main() {
    sum := 1
    for sum < 1000 {
        sum += sum
 }
 fmt.Println(sum)
}

// Infinite loop
for {
}
```

Conditional:

```go
func sqrt(x float64) string {
    if x < 0 {
      return sqrt(-x) + "i"
    }
    return fmt.Sprint(math.Sqrt(x))
}

// The if statement can start with a short statement to execute before the condition.
// Variables declared by the statement are only in scope until the end of the if.
func pow(x, n, lim float64) float64 {
    if v := math.Pow(x, n); v < lim {
     return v
    }
    return lim
}

// Variables declared inside an if short statement are also available inside any of the else blocks.
func pow(x, n, lim float64) float64 {
    if v := math.Pow(x, n); v < lim {
        return v
    } else {
        fmt.Printf("%g >= %g\n", v, lim)
    }
    // can't use v here, though
    return lim
}

// Switch cases evaluate cases from top to bottom, stopping when a case succeeds.
fmt.Print("Go runs on ")
switch os := runtime.GOOS; os {
case "darwin":
    fmt.Println("macOS.")
case "linux":
    fmt.Println("Linux.")
default:
    fmt.Printf("%s.\n", os)
}

// Switch without a condition is the same as switch true.
// This construct can be a clean way to write long if-then-else chains.
t := time.Now()
switch {
case t.Hour() < 12:
    fmt.Println("Good morning!")
case t.Hour() < 17:
    fmt.Println("Good afternoon.")
default:
    fmt.Println("Good evening.")
}
```

A defer statement defers the execution of a function until the surrounding function returns. The call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.

```go
func main() {
    defer fmt.Println("world")

    fmt.Println("hello")
}
```

Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in last-in-first-out order.

## Methods and Interfaces

f

## Generics

f

## Concurrency

f

## Testing

f

## Reflection

f

## Low Level

f
