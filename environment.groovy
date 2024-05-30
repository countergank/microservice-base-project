//archivo que usa repo creator para colocar dentro del repo de la aplicacion
def setenv(def file_stack="null")
{
  if (env.BRANCH_NAME == "develop")
  {
    sh 'echo "$(date) : Seteando variables - BRANCH = ${BRANCH_NAME}"'
    // OCP_LOAD_SECRET para que OCP cargue los secrets definidos en deployments/secrets/*.yaml
    OCP_LOAD_SECRET=true
    OCP_LOAD_ENVIRONMENT=[
      "NODE_ENV=development",
    ]
    return false
  }
  else if (env.BRANCH_NAME =~ "feature/*" || env.BRANCH_NAME =~ "bugfix/*")
  {
    sh 'echo "$(date) : Seteando variables - BRANCH = ${BRANCH_NAME}"'
    // OCP_LOAD_SECRET para que OCP cargue los secrets definidos en deployments/secrets/*.yaml
    OCP_LOAD_SECRET=true
    OCP_LOAD_ENVIRONMENT=[
      "NODE_ENV=development",
    ]
    return false
  }
  else
  {
    echo "ERROR: No entro a ninguna condicion de branch = ${env.BRANCH_NAME}"
    devops.fail()
  }
}
return this;
