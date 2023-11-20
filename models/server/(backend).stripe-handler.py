def ENV():
  return "http://localhost:3000"

class AddRoute():
  route_pathname: str
  apiRoute: bool
  required_transport_data_for_request: str
  success: str
  status: str
  requiresAuth: bool


  def __init__(self):
    import requests.api
    env_next_app_url = ENV()

    createRoute = requests.api.post(
      url=env_next_app_url,
      data=""
    )

    
    