# Notes on GCP

## Storage

Google Cloud Storage is a service for storing objects in Google Cloud. An object is an immutable piece of data consisting of a file of any format. Objects are stored in containers called buckets. All buckets are associated with a project, and one can group projects under an organization. Each project, bucket, managed folder, and object in Google Cloud is a resource in Google Cloud, as are things such as Compute Engine instances.

An organization can have many different projects, one per app (usually). Each project can contain multiple buckets, which are containers to store objects. Each bucket can contain essentially unlimited individual objects, but can't contain other buckets. Also, it can contain multiple managed folders, which grant additional access beyond the access granted to the overall bucket. Buckets can also have hierarchical namespace enabled. Those can store your data in a logical file system structure. The folder management operations provide reliability and management capabilities, including creating, deleting, listing, and renaming folders. A bucket's name is non-editable metadata.

### Managing Buckets

To create a bucket:

```bash
gcloud storage buckets create gs://BUCKET_NAME --location=BUCKET_LOCATION
```

To list the buckets in a project:

```bash
gcloud storage ls
```

To display a bucket's metadata:

```bash
gcloud storage buckets describe gs://BUCKET_NAME
```

To determine a bucket's size (in bytes):

```bash
gcloud storage du gs://BUCKET_NAME --summarize
```

To get a bucket's storage layout:

```bash
gcloud alpha storage buckets describe gs://BUCKET_NAME --raw --format="default(hierarchicalNamespace)"
```

When a bucket is created, some of the properties you set are permanent and cannot be changed, including the bucket's name and the project it is part of. However, one can effectively move or rename your bucket. If there is no data in the old bucket, delete it and create another one with the properties desired. If the old bucket has data, create a new bucket with the properties desired, copy data from the old bucket to the new bucket, and delete the old bucket and its contents.

To recursively copy the contents of the source bucket to the destination bucket:

```bash
gcloud storage cp --recursive gs://SOURCE_BUCKET/* gs://DESTINATION_BUCKET
```

To recursively delete the contents from the source bucket, along with the source bucket itself:

```bash
gcloud storage rm --recursive gs://SOURCE_BUCKET
```

### Managing Objects in Buckets

Objects are immutable. An object's storage lifetime is the time between successful object creation, such as uploading, and successful object deletion. It is possible to replace objects that are stored in Cloud Storage, and doing so happens atomically: until the new upload completes, the old version of the object is served to readers, and after the upload completes, the new version of the object is served to readers. A single replacement operation marks the end of one immutable object's lifetime and the beginning of a new immutable object's lifetime.

To list the objects in a bucket:

```bash
gcloud storage ls --recursive gs://BUCKET_NAME/**
```

To download an object from a bucket:

```bash
gcloud storage cp gs://BUCKET_NAME/OBJECT_NAME SAVE_TO_LOCATION
```

To stream a download:

```bash
# Run the gcloud storage cp command using a dash for the destination URL, then pipe the data to the process:
gcloud storage cp gs://BUCKET_NAME/OBJECT_NAME - | PROCESS_NAME
```

### Storage Classes

![image](img/storage_class_gcp.jpg)

- __Standard Storage__: best for data that is frequently accessed ("hot" data), as well as data that is stored for only brief periods of time. When used in a region, Standard storage is appropriate for storing data in the same location as Google Kubernetes Engine clusters or Compute Engine instances that use the data. Co-locating your resources maximizes the performance for data-intensive computations and can reduce network charges.
- __Nearline Storage__: a low-cost, highly durable storage service for storing infrequently accessed data. Nearline storage is a better choice than Standard storage in scenarios where slightly lower availability, a 30-day minimum storage duration, and costs for data access are acceptable trade-offs for lowered at-rest storage costs. Ideal for data you plan to read or modify on average once per month or less.
- __Coldline Storage__: a very-low-cost, highly durable storage service for storing infrequently accessed data. Coldline storage is a better choice than Standard storage or Nearline storage in scenarios where slightly lower availability, a 90-day minimum storage duration, and higher costs for data access are acceptable trade-offs for lowered at-rest storage costs. Coldline storage is ideal for data you plan to read or modify at most once a quarter. Note, however, that for data being kept entirely for backup or archiving purposes, Archive storage is more cost-effective, as it offers the lowest storage costs.
- __Archive Storage__: the lowest-cost, highly durable storage service for data archiving, online backup, and disaster recovery. Unlike the "coldest" storage services offered by other Cloud providers, the data is available within milliseconds, not hours or days. Like Nearline storage and Coldline storage, Archive storage has a slightly lower availability than Standard storage. Archive storage also has higher costs for data access and operations, as well as a 365-day minimum storage duration. Archive storage is the best choice for data that you plan to access less than once a year.

To change the default storage class of a bucket:

```bash
gcloud storage buckets update gs://BUCKET_NAME --default-storage-class=STORAGE_CLASS
```

## Compute

## Networking

## Observability
