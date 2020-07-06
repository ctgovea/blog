---
title: "Passing the AZ-203 exam - *Part 1*"
date: "2019-04-13T08:24:00.000Z"
description: "Develop Azure Infrastructure as a Service Compute Solution - Study Guide"
---
## *Develop Azure Infrastructure as a Service Solutions*
---

 Welcome to Part 1 of the [AZ-203 study guide]((../passing-az-203-exam/)). In this post we'll cover:

- [Azure Batch](#azure-batch)
- [Containerized Solutions](#containerized-solutions)
---

## Azure Batch

Azure Batch lets you run large scale parallel and high-performant computing (HPC) jobs. Okay, that was a mouthful. All you need to know are the CLI commands to create jobs, their tasks and a pool.

``` bash
az batch pool create 
    --id "my-pool-name" 
    --vm-size Standard_A1_v2 
    --target-dedicated-nodes 2
    --image canonical: ubuntuserver:16.04 LTS
    --node-agent-sku-id "batch.node.ubuntu.16.04"
```

``` bash
az batch job create 
    --id "my-job"                          
    --pool-id "my-pool-name"
```

``` bash
az batch task create 
    --task-id "my-task"
    --job-id "my-job"
    --command-line "echo 'I am the task running...'"
```

## Containerized Solutions

You might be asked the structure of a Dockerfile, so remember this flow: 

` FROM ➡️ WORKDIR ➡️ COPY ➡️ ENDPOINT `

### Azure Kubernetes Service (AKS)

```bash
az aks create 
    -g "my-resource-group-name"
    - n "my-cluster"
    --node-count 1
    --generate-ssh-keys
```

## Next up...

Go to Part 2 of the series on the [Azure Platform as a Service Compute Solution](../passing-az-203-p2-azure-platform-as-service-compute)