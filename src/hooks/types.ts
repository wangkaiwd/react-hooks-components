export type Patch<S> = Partial<S> | ((prevState: S) => Partial<S>)
