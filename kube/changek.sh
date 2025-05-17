#!/usr/bin/bash

az logout

domain="$1"
resource_group="$2"
name="$3"


if [ "$domain" == "#" ]; then
    echo "make sure you are usign correct VPN region"
    az login --username #
    az account set --subscription #

    if [[ -n "$resource_group" && -n "$name" ]]; then 
        az aks get-credentials --resource-group "$resource_group" --name "$name" --overwrite-existing
    else
        echo "skipping specific resource group and name set"
    fi

    kubelogin convert-kubeconfig -l azurecli
    
elif [ "$domain" == "##" ]; then
    az login --use-device-code
    az account set --subscription #

    if [[ -n "$resource_group" && -n "$name" ]]; then 
        az aks get-credentials --resource-group "$resource_group" --name "$name" --overwrite-existing
    else
        echo "skipping specific resource group and name set"
    fi
    
    kubelogin convert-kubeconfig -l azurecli
else
    echo "provide correct domain"
fi

