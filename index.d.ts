import { Reverse } from 'typescript-tuple';
/**
 * Extracts function arguments
 */
export declare type ExtractFunctionArguments<Fn> = Fn extends (...args: infer P) => any ? P : never;
/**
 * Extracts function return values
 */
export declare type ExtractFunctionReturnValue<Fn> = Fn extends (...args: any[]) => infer P ? P : never;
declare type BooleanSwitch<Test, T = true, F = false> = Test extends true ? T : F;
/**
 * Replacement for Function, represents any kind of function.
 */
export declare type AnyFunction = (...args: any[]) => any;
/**
 * Represents any function with an arity of 1.
 */
export declare type AnyFunction1 = (a: any) => any;
declare type Arbitrary = 'It is now 1554792354 since seconds since Jan 01, 1970';
declare type IsAny<O, T = true, F = false> = Arbitrary extends O ? any extends O ? T : F : F;
/**
 * A powerful recursive type function composition using `pipe`.
 */
export declare type Pipe<Fns extends any[], IsPipe = true, PreviousFunction = void, InitalParams extends any[] = any[], ReturnType = any> = {
    'next': ((..._: Fns) => any) extends ((_: infer First, ..._1: infer Next) => any) ? PreviousFunction extends void ? Pipe<Next, IsPipe, First, ExtractFunctionArguments<First>, ExtractFunctionReturnValue<First>> : ReturnType extends ExtractFunctionArguments<First>[0] ? Pipe<Next, IsPipe, First, InitalParams, ExtractFunctionReturnValue<First>> : IsAny<ReturnType> extends true ? Pipe<Next, IsPipe, First, InitalParams, ExtractFunctionReturnValue<First>> : {
        ERROR: ['Return type ', ReturnType, 'does comply with the input of', ExtractFunctionArguments<First>[0]];
        POSITION: ['Position of problem for input arguments is at', Fns['length'], 'from the', BooleanSwitch<IsPipe, 'end', 'beginning'>, 'and the output of function to the ', BooleanSwitch<IsPipe, 'left', 'right'>];
    } : never;
    'done': (...args: InitalParams) => ReturnType;
}[Fns extends [] ? 'done' : 'next'];
/**
 * A powerful recursive type function composition using `compose`.
 */
export declare type Compose<Fns extends any[]> = Pipe<Reverse<Fns>, false>;
/**
 * An example of `Pipe` used in a `pipe` function
 */
export declare type PipeFn = <Fns extends [AnyFunction, ...AnyFunction1[]]>(...fns: Fns & Pipe<Fns> extends AnyFunction ? Fns : never) => Pipe<Fns>;
/**
 * An example of `Pipe` used in a `pipeline` function (a `pipe` that is immediately evaluated)
 */
export declare type PipelineFn = <Arg, Fns extends [(arg: Arg) => any, ...AnyFunction1[]]>(arg: Arg, ...fns: Fns & Pipe<Fns> extends AnyFunction ? Fns : never) => ExtractFunctionReturnValue<Pipe<Fns>> extends {
    ERROR: [string];
    POSITION: [string];
} ? Pipe<Fns> : ExtractFunctionReturnValue<Pipe<Fns>>;
/**
 * An example of `Compose` used in a `compose` function
 */
export declare type ComposeFn = <Fns extends [AnyFunction, ...AnyFunction[]]>(...fns: Fns & Compose<Fns> extends AnyFunction ? Fns : never) => Compose<Fns>;
export {};
