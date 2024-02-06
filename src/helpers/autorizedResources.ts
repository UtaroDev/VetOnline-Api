// Funcion que se usa para saber si un usuario es admin o no
export const isAdmin = (userIsAdmin: boolean | undefined): boolean => {
  return userIsAdmin !== null && userIsAdmin !== undefined && userIsAdmin
}

// Funcion que se compara ids de request, con el id desencriptado para que solo modifiquen sus propios datos

interface paramsForIsAuthorized {
  userIsAdmin: boolean | undefined
  userIdRequest: string | undefined
  userIdData: string | undefined
}
export const isAuthorized = ({
  userIsAdmin,
  userIdRequest,
  userIdData
}: paramsForIsAuthorized) => {
  if (!isAdmin(userIsAdmin)) {
    if (userIdData !== userIdRequest) {
      return false
    }
  }
  return true
}
