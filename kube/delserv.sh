kubectl config use-context <cluster>

### Deployments ###
kubectl get deployments -n <teamname> | grep "servicename"

kubectl delete deployment "servicename" -n tradingteam

### Services ###
kubectl get services -n <teamname> | grep "servicename"

kubectl delete service servicename -n <teamname>
