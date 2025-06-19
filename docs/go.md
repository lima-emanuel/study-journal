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

Functions are values too. They can be passed around just like other values:

```go
func compute(fn func(float64, float64) float64) float64 {
    return fn(3, 4)
}

func main() {
    hypot := func(x, y float64) float64 {
        return math.Sqrt(x*x + y*y)
    }
    fmt.Println(hypot(5, 12))
    fmt.Println(compute(hypot))
    fmt.Println(compute(math.Pow))
}
```

Functions often return an error value, and calling code should handle errors by testing whether the error equals nil. A nil error denotes success; a non-nil error denotes failure.

```go
i, err := strconv.Atoi("42")
if err != nil {
    fmt.Printf("couldn't convert number: %v\n", err)
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

An array's length is part of its type, so arrays cannot be resized. An array variable denotes the entire array; it is not a pointer to the first array element. This means that when you assign or pass around an array value you will make a copy of its contents. To avoid the copy you could pass a pointer to the array, but then that’s a pointer to an array, not an array. One way to think about arrays is as a sort of struct but with indexed rather than named fields: a fixed-size composite value.

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

The `make` function allocates a zeroed array and returns a slice that refers to that array:

```go
a := make([]int, 5)     // len(a)=5, cap(a)=5
b := make([]int, 0, 5) // len(b)=0, cap(b)=5
b = b[:cap(b)]        // len(b)=5, cap(b)=5
b = b[1:]            // len(b)=4, cap(b)=4
```

Slices can contain any type, including other slices:

```go
board := [][]string{
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
}
```

The `append` built-in function appends elements to the end of a slice. If it has sufficient capacity, the destination is resliced to accommodate the new elements. If it does not, a new underlying array will be allocated. Append returns the updated slice. It is therefore necessary to store the result of append, often in the variable holding the slice itself:

```go
slice = append(slice, elem1, elem2)
slice = append(slice, anotherSlice...)
```

To increase the capacity of a slice one must create a new, larger slice and copy the contents of the original slice into it:

```go
t := make([]byte, len(s), (cap(s)+1)*2)
copy(t, s)
s = t
```

A `map` maps keys to values. The zero value of a map is `nil`. A nil map has no keys, nor can keys be added. The make function returns a map of the given type, initialized and ready for use.

```go
type Vertex struct {
    Lat, Long float64
}

var m map[string]Vertex

func main() {
    m = make(map[string]Vertex)
    m["Bell Labs"] = Vertex{
        40.68433, -74.39967,
    }

    // Or as a literal
    var m = map[string]Vertex{
    "Bell Labs": Vertex{
        40.68433, -74.39967,
    },
    "Google": Vertex{
        37.42202, -122.08408,
    },
    }

    // Or even
    var m = map[string]Vertex{
        "Bell Labs": {40.68433, -74.39967},
        "Google":    {37.42202, -122.08408},
    }
}
```

Mutate maps like so:

```go
// Insert
m[key] = elem

// Retrieve
elem = m[key]

// Delete
delete(m, key)

// Test if present
// If key is in m, ok is true
elem, ok := m[key]
```

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

The range form of the for loop iterates over a slice or map:

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
    // Two values are returned for each iteration.
    // The first is the index,
    // and the second is a copy of the element at that index.
    for i, v := range pow {
        fmt.Printf("2**%d = %d\n", i, v)
    }
}
```

You can skip the index or value by assigning to `_`.

Conditionals:

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

Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in last-in-first-out order. A deferred function’s arguments are evaluated when the defer statement is evaluated. Also, deferred functions may read and assign to the returning function’s named return values.

## Methods and Interfaces

### Methods

A method is a function with a special receiver argument. The receiver appears in its own argument list between the func keyword and the method name:

```go
type Vertex struct {
    X, Y float64
}

func (v Vertex) Abs() float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
    v := Vertex{3, 4}
    fmt.Println(v.Abs())
}
```

You can only declare a method with a receiver whose type is defined in the same package as the method.

You can declare methods with pointer receivers. This means the receiver type has the literal syntax `*T` for some type T. (Also, T cannot itself be a pointer such as `*int`). Methods with pointer receivers can modify the value to which the receiver points (as Scale does here). With a value receiver, the method operates on a copy of the original value. (This is the same behavior as for any other function argument). The method must have a pointer receiver to change the Vertex value declared:

```go
type Vertex struct {
    X, Y float64
}

func (v Vertex) Abs() float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v Vertex) Scale(f float64) {
    v.X = v.X * f
    v.Y = v.Y * f
}

func main() {
    v := Vertex{3, 4}
    v.Scale(10)
    fmt.Println(v)
}
```

Functions with a pointer argument must take a pointer, while methods with pointer receivers take either a value or a pointer. Functions that take a value argument must take a value of that specific type, while methods with value receivers take either a value or a pointer as the receiver when they are called.

Two reasons to use a pointer receiver:

- The method can modify the value that its receiver points to.
- To avoid copying the value on each method call.

All methods on a given type should have either value or pointer receivers, but not a mixture of both.

### Interfaces

An interface type is defined as a set of method signatures. A value of interface type can hold any value that implements those methods. A type implements an interface by implementing its methods. There is no explicit declaration of intent, no "implements" keyword. Implicit interfaces decouple the definition of an interface from its implementation, which could then appear in any package without prearrangement.

Example: the `fmt` package looks for the built-in `fmt.Stringer` interface to print values:

```go
type Stringer interface {
    String() string
}
```

So one can implement `Stringer` on one's type to customize printing:

```go
type IPAddr [4]byte

func (ip IPAddr) String() string {
    return fmt.Sprintf("%v.%v.%v.%v", ip[0], ip[1], ip[2], ip[3])
}

func main() {
    hosts := map[string]IPAddr{
       "loopback":  {127, 0, 0, 1},
       "googleDNS": {8, 8, 8, 8},
    }
    for name, ip := range hosts {
       fmt.Printf("%v: %v\n", name, ip)
    }
}
```

Another important interface is `error`:

```go
type error interface {
    Error() string
}
```

## Generics

The type parameters of a function appear between brackets, before the function's arguments:

```go
func Index[T comparable](s []T, x T) int
```

This declaration means that s is a slice of any type T that fulfills the built-in constraint comparable. x is also a value of the same type.

A type can be parameterized with a type parameter, which could be useful for implementing generic data structures.

```go
type List[T any] struct {
    next *List[T]
    val  T
}
```

## Concurrency

A *goroutine* is a lightweight thread managed by the Go runtime.

```go
go f(x, y, z)
```

The evaluation of `f`, `x`, `y`, and `z` happens in the current goroutine and the execution of f happens in the new goroutine. Goroutines run in the same address space, so access to shared memory must be synchronized. The sync package provides useful primitives.

*Channels* are a typed conduit through which you can send and receive values with the channel operator, `<-`.

```go
ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and
           // assign value to v.
```

Channels must be created before use:

```go
ch := make(chan int)
```

By default, sends and receives block until the other side is ready. This allows goroutines to synchronize without explicit locks or condition variables.

Channels can be buffered. Provide the buffer length as the second argument to `make` to initialize a buffered channel:

```go
ch := make(chan int, 100)
```

A sender can close a channel to indicate that no more values will be sent. Receivers can test whether a channel has been closed by assigning a second parameter to the receive expression:

```go
v, ok := <-ch
```

`ok` is `false` if there are no more values to receive and the channel is closed. A loop `for i := range c` receives values from the channel repeatedly until it is closed. Only the sender should close a channel, never the receiver. Sending on a closed channel will cause a panic. Channels aren't like files; you don't usually need to close them. Closing is only necessary when the receiver must be told there are no more values coming, such as to terminate a range loop.

```go
func fibonacci(n int, c chan int) {
    x, y := 0, 1
    for i := 0; i < n; i++ {
        c <- x
     x, y = y, x+y
    }
    close(c)
}

func main() {
    c := make(chan int, 10)
    go fibonacci(cap(c), c)
    for i := range c {
        fmt.Println(i)
    }
}
```

The select statement lets a goroutine wait on multiple communication operations. A select blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready.

## Testing

TODO

## Reflection

TODO

## Low Level

TODO

## Standard Library

### JSON

To encode JSON data we use the `Marshal` function:

```go
// Given this data structure:
type Message struct {
    Name string
    Body string
    Time int64
}

// And this instance:
m := Message{"Alice", "Hello", 1294706395881547000}

// We can marshall m:
b, err := json.Marshal(m)

// If err is nil:
b == []byte(`{"Name":"Alice","Body":"Hello","Time":1294706395881547000}`)
```

To encode JSON data we use the `Unmarshal` function:

```go
// Create a place where the decoded data will be stored
var m Message

// Call json.Unmarshal, passing it a []byte of JSON data and a pointer to m
err := json.Unmarshal(b, &m)

// If err is nil, b will be stored in m
```
