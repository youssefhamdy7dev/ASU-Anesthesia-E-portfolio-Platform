export const protectedSupervisorRoutes = [
  "/supervisor",
  "/supervisor/cases/pending-case-anesthetic",
  "/supervisor/cases/pending-case-intensive",
  "/supervisor/cases/pending-case-procedure",
  "/supervisor/accounts/view-residents",
];
export const protectedAdminRoutes = [
  "/supervisor/accounts",
  "/supervisor/accounts/pending",
  "/supervisor/accounts/create",
  "/supervisor/pending-rotation",
];
export const protectedRoutes = [
  "/",
  "/anaesthetic",
  "/procedure",
  "/intensive",
  "/rotation",
  "/cases/anaesthetic",
  "/cases/intensive",
  "/cases/procedure",
  "/cases",
  "/view-rotations",
];
export const userAuthRoutes = ["/SignIn", "/signup"];
export const adminAuthRoutes = ["/supervisor/login"];
