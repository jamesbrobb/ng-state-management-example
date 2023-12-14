export interface DateState {
  current: string
  min: string
  max: string
}

export const initialDateState: DateState = {
  current: new Date().toISOString(),
  min: new Date().toISOString(),
  max: new Date(new Date().setDate(new Date().getDate() + 9)).toISOString()
};
