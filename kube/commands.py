context_w = ''
context_n = ''
team = ''
deployment = ''

get_north = [
    'kubectl', 
    'get', 
    'deploy', 
    deployment, 
    '-n', 
    team, 
    '--context', 
    context_n,
    '-o=jsonpath="{.spec.replicas}"'
]

get_west = [
    'kubectl', 
    'get', 
    'deploy', 
    deployment, 
    '-n', 
    team, 
    '--context', 
    context_w,
    '-o=jsonpath="{.spec.replicas}"'
]

scale_north = [
    'kubectl', 
    'scale', 
    'deploy', 
    deployment,
    '-n',
    team,
    '--replicas=40',
    '--context',
    context_n,
]

scale_west = [
    'kubectl', 
    'scale', 
    'deploy', 
    deployment,
    '-n',
    team,
    '--replicas=40',
    '--context',
    context_w
]
