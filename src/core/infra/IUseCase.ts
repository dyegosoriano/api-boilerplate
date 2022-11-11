export interface IUseCase<Response> {
  execute: (data: any) => Promise<Response | void>
}
