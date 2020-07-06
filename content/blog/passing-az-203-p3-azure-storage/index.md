---
title: "Passing the AZ-203 exam - *Part 3*"
date: "2019-04-13T08:24:00.000Z"
description: "Develop for Azure Storage - Study Guide"
---
## *Develop Azure Infrastructure as a Service Solutions*
---

 This is Part 3 of the [AZ-203 study guide]((../passing-az-203-exam/)). In this post we'll cover:

- [Azure Storage](#azure-storage)
- [CosmosDB](#cosmos-db)
- [Blob Storage](#blob-storage)
---

## Azure Storage

Familiarize yourself on how to query data and apply filters from C# with `TableQuery.GenerateFilterCondition` and `TableQuery.Where`

``` c#
public static async Task<List<User>> FindUsersAsync(CloudTable table, string name)
{
    // ⚠️ Remember how to create filters!
    var filterCondition = TableQuery.GenerateFilterCondition(
                                        "Name", 
                                        QueryComparison.Equal, 
                                        name);
    var query = new TableQuery<User>.Where(filterCondition);
    var results = await table.ExecuteQuerySegmentedAsync(query, null);    
    
    return results.ToList();
}
```
Do checkout the other methods such as `TableOperation.Retrieve, TableOperation.Delete`

## Cosmos DB

*Create a Cosmos DB account*
```bash
az cosmosdb create
    -g "my-resource-group-name"
    --name "cosmosDBaccountname"
    --kind GlobalDocumentDB  # MongoDB | Cassandra | Gremlin

```
*Create a database*
```bash
az cosmosdb database create
    - g "my-resource-group-name"
    --name "cosmosDBaccountname"
    --db-name "my-database"
```

### Consistency Models

Read up on the different
[Azure Cosmos DB Consistency Levels](https://docs.microsoft.com/en-us/azure/cosmos-db/consistency-levels) and know when to use them, specially the `Strong` and `Bounded Staleness` (the most expensive ones, by the way). 

![Azure Cosmos DB Consistency Levels](./five-consistency-levels.png)

```bash
# ⚠️ How do you ensure reads reflect the most recent write". 
With a strong consistency level.
```

## Blob Storage

The exam tends to ask questions about concurrency control in blobs. This involves using leases to checkout and block files so only you can update.

```c#
var leaseId = Guid.NewGuid().ToString();

cloudBlockBlob.AcquireLease(TimeSpan.FromSeconds(30), leaseId);

await cloudBlockBlob.ReleaseLeaseAsync(new AccessCondition()
{
    LeaseId = leaseId
})
```