import { Reverse } from 'typescript-tuple';
export declare type ExtractFunctionArguments<Fn> = Fn extends (...args: infer P) => any ? P : never;
export declare type ExtractFunctionReturnValue<Fn> = Fn extends (...args: any[]) => infer P ? P : never;
declare type BooleanSwitch<Test, T = true, F = false> = Test extends true ? T : F;
declare type Arbitrary = 'It is now 1554792354 since seconds since Jan 01, 1970';
export declare type AnyFunction = (...args: any[]) => any;
export declare type Function1 = (a: any) => unknown;
export declare type IsAny<O, T = true, F = false> = Arbitrary extends O ? any extends O ? T : F : F;
export declare type Pipe<Fns extends any[], IsPipe = true, PreviousFunction = void, InitalParams extends any[] = any[], ReturnType = any> = {
    'next': ((..._: Fns) => any) extends ((_: infer First, ..._1: infer Next) => any) ? PreviousFunction extends void ? Pipe<Next, IsPipe, First, ExtractFunctionArguments<First>, ExtractFunctionReturnValue<First>> : ReturnType extends ExtractFunctionArguments<First>[0] ? Pipe<Next, IsPipe, First, InitalParams, ExtractFunctionReturnValue<First>> : IsAny<ReturnType> extends true ? Pipe<Next, IsPipe, First, InitalParams, ExtractFunctionReturnValue<First>> : {
        ERROR: ['Return type ', ReturnType, 'does comply with the input of', ExtractFunctionArguments<First>[0]];
        POSITION: ['Position of problem for input arguments is at', Fns['length'], 'from the', BooleanSwitch<IsPipe, 'end', 'beginning'>, 'and the output of function to the ', BooleanSwitch<IsPipe, 'left', 'right'>];
    } : never;
    'done': (...args: InitalParams) => ReturnType;
}[Fns extends [] ? 'done' : 'next'];
export declare type Compose<Fns extends any[]> = Pipe<Reverse<Fns>, false>;
export declare type PipeFn = <Fns extends [AnyFunction, ...Function1[]]>(...fns: Fns & Pipe<Fns> extends AnyFunction ? Fns : never) => Pipe<Fns>;
export declare type PipelineFn = <Arg, Fns extends [(arg: Arg) => any, ...Function1[]]>(arg: Arg, ...fns: Fns & Pipe<Fns> extends AnyFunction ? Fns : never) => ExtractFunctionReturnValue<Pipe<Fns>> extends {
    ERROR: [string];
    POSITION: [string];
} ? Pipe<Fns> : ExtractFunctionReturnValue<Pipe<Fns>>;
export declare type ComposeFn = <Fns extends [AnyFunction, ...AnyFunction[]]>(...fns: Fns & Compose<Fns> extends AnyFunction ? Fns : never) => Compose<Fns>;
export {};
