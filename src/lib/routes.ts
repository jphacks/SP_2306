const routes = {
  home: () => `/`,
  sample: () => `/sample`,
  form: () => `/form`,
}

export type RouteKeys = keyof typeof routes

export default routes
