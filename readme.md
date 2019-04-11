# Introduction

This package strictly contains types. The star of this package is a recursive `Pipe` type with surprising utility over parameter overloading. These benefits include

* unlimited
* parameter name preservation
* variadic input for both `Pipe` and `Compose`   
* friendly messages on error pointing to the problem

It's biggest weakness is still stronger than the parameter overloading approach, namely generics on compose functions are not preserved; however, it will accept them and the resulting type will be `{}`. The overloading approach can actually often fail to compile in those situations.

The main benefit of the overloading approach to this recursive type is that when error occur, the compiler is better able to explain where the error occurred. With this type, in the event of a compile error, the returned type will itself contain information on what went wrong.

# Exports


### Main
Key exported types include 

* `Pipe` as mentioned above
* `Compose` data flows from bottom up ( or left to right )
* `PipeFn`  Pipe applied to create a reference function type
* `ComposeFn` Compose applied to create a reference function type
* `PipelineFn` Pipe applied to create a useful `pipeline` function type

### Secondary

Other types exported
* `ExtractFunctionArguments` extracts function arguments
* `ExtractFunctionReturnValue` extracts a functions return type

### Circumstantial 
Ad-hoc types that may aid in constructing applications from these types.
* `AnyFunction` a type representing any kind of function, an alternative to Function
* `AnyFunction1` a function representing any function with an arity of 1

# Installation

`npm install pipe-and-compose-types`

# Usage 

Example:

```ts
import { PipeFn } from 'pipe-and-compose-types'

declare const example: ( first: number, rest: number[] ) => number
declare const pipe: PipeFn

const result = pipe(
  example,
  String
) // (first: number, rest: number[]) => string
```