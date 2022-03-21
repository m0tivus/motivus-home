# What is Motivus?
Motivus is an ecosystem for distributed computing that enables people and companies from all around the world to combine their computing power to solve real world problems.

You can execute tasks on *Motivus Waterbear Cluster* using a driver program, that describes the task to be distributed to the workers and result handling.

![components-diagram](https://motivus.cl/components-diagram.png "Components diagram")

The task definition references an *algorithm*; the code that each worker executes, and some inputs; files, execution arguments and/or function parameters.

*Algorithms* can be obtained directly from the *Motivus Marketplace* or compiled from source. We currently support algorithm compilation for programs written in C, C++ and Rust programming languages.

> You can also upload your own algorithm to *Motivus Marketplace* for other people to use it on their drivers.

# Writing a Driver program
To write and run your driver program, you'll need to provide the following environment:
* Python = 3.7 | 3.8 | 3.9
    * We recommend using a `conda` environment.
* [*Motivus Client library*](https://pypi.org/project/motivus/): `$ pip install motivus`
* A *Motivus Application Token*

The easiest way to write a driver is by using a listed algorithm in the *Motivus Marketplace*.

## Steps
1. Create an `.env` file containing your `APPLICATION_TOKEN` as follows:
```sh
# .env
# REQUIRED
WEBSOCKET_URI=wss://waterbear.api.motivus.cl/client_socket/websocket

APPLICATION_TOKEN=<your motivus application token>
```
2. Create a python script and define your task, for example:

```python
# driver.py
import asyncio
from motivus.client import Client

data = [
    [-2.7825343, -1.7604825, -5.5550113, -2.9752946, -2.7874138],
    [-2.9847919, -3.8209332, -2.1531757, -2.2710119, -2.3582877],
    [-3.0109320, -2.2366132, -2.8048492, -1.2632331, -4.5755581],
    [-2.8432186, -1.0383805, -2.2022826, -2.7435962, -2.0013399],
    [-2.6638082, -3.5520086, -1.3684702, -2.1562444, -1.3186447],
    [1.7409171, 1.9687576, 4.7162628, 4.5743537, 3.7905611],
    [3.2932369, 2.8508700, 2.5580937, 2.0437325, 4.2192562],
    [2.5843321, 2.8329818, 2.1329531, 3.2562319, 2.4878733],
    [2.1859638, 3.2880048, 3.7018615, 2.3641232, 1.6281994],
    [2.6201773, 0.9006588, 2.6774097, 1.8188620, 1.6076493],
]

task_definition = {
    'algorithm': "kmeans",
    'algorithm_version': "0.0.1",
    'params': [
        data,
        2
    ]
}

async def main():
    motivus = await Client.connect()

    task_id = motivus.call_async(task_definition)
    task = motivus.select_task(task_id)
    return await task

result = asyncio.run(main())
print(result)
# [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
```

3. Run your driver on *Motivus Waterbear*: 
```sh
$ python driver.py
```

## Running Algorithms In Loop-back Mode
You can also run your Driver's algorithms using local loop-back workers. This feature is experimental.

To enable loop-back mode follow this steps:
1. Make sure *Motivus CLI* tool and docker are available
1. Execute `$ motivus loopback` and take note of the command output.
1. Make the indicated environment variable available to your Driver's execution.
1. Run your Driver as usual `$ python driver.py`

## Task Definition
To define your task use a dict, this dict can declare several keys:
|key|value type|description|required|
|---|----------|-----------|--------|
|`algorithm`|string|The algorithm name as published on *Motivus Marketplace*|yes|
|`algorithm_name`|string|The algorithm version|yes|
|`params`|list|Parameters to be passed to the algorithm main function invocation: i.e. `fun(list[0], list[1] ...)`|no|
|`arguments`|string \| list[string]|Arguments to be passed to the algorithm invocation, as if where executed using command line arguments: i.e. having `["--some-flag", "--another_flag=1"]` would be equivalent to call `$ kmeans --some-flag --another_flag=1` on the worker.|no|
|`preload_files`|dict[string,string]|Files that should be loaded on the worker's virtual filesystem prior to algorithm execution, which can be accessed from the algorithm. The dict key should be the absolute location and file name where the file will be available and the value should be the file readed from the driver's local filesystem using `motivus.read_file(path)`.|no|
|`result_files`|dict[string,string]]|Files that should be extracted from the worker's virtual filesystem and returned as result to the driver. The key should be a string with the absolute file location on the virtual filesystem and the value should be a path on the driver's filesystem where the file should be stored.|no|
|`wasm_path`|string|Where should the client look for the algorithm `.wasm` generated file.|required when no `algorithm` and `algorithm_version` are used.|
|`loader_path`|string|Where should the client look for the algorithm `.js` generated file.|required when no `algorithm` and `algorithm_version` are used.|
|`data_link`|string|A URL with the algorithm default starting filesystem. When using a filesystem during algorithm compilation this file is generated as a `.data.zip` file.|required only for C\C++ algorithms.|

# Writing Your Own Algorithm
To write, test and distribute your algorithm using the *Motivus Marketplace*, you'll need to provide the following environment:
* Docker
    * Your user must belong to the `docker` group.
* Python = 3.7 | 3.8 | 3.9
    * We recommend using a `conda` environment.
* [*Motivus CLI tool* and *Motivus Client library*](https://pypi.org/project/motivus/): `$ pip install motivus`
* A *Motivus Personal Access Token*
* A previously created algorithm on *Motivus Marketplace*, in this example we'll use `kmeans`


**We'll describe the steps for a Rust algorithm.**

## Steps

1. The easiest way to scaffold a new Rust algorithm is by using `wasm-pack`:
```
$ wasm-pack new kmeans
```
2. Add a `main` function to `src/lib.rs` alongside your implementation, which will be invoked from your Driver program with `params` as function parameters, as follows.
```rust
// src/lib.rs
#[wasm_bindgen]
pub fn main(input: &JsValue, clusters: &JsValue) -> String {
  let xs: Vec<Vec<f64>> = input.into_serde().unwrap();
  let k: usize = clusters.into_serde().unwrap();
  let clustering = kmeans(xs, k);
  return format!("{:?}", clustering);
} 

```
3. Create a `motivus.yml` file, declaring some metadata of your algorithm for the framework to use.
```yaml
# motivus.yml
---
version: 1.0

build:
  compiler: mvrc
  source: .
  filesystem: .

package:
  name: kmeans
  version: 0.0.1
  metadata:
      short_description: "K-means clustering"
      license: "MIT"
      author: "Motivus"
      url: "https://motivus.cl/"
      upstream_url: "https://github.com/m0tivus/example-kmeans-rust"
      long_description: "k-means clustering is a method of vector quantization, originally from signal ..."
```
4. Build your algorithm using the *Motivus CLI tool*:
```sh
$ motivus build
```
5. You can test your build on a local worker running your driver in loop-back mode
6. Create an `.env` file with your personal access token:
```sh
# .env
PERSONAL_ACCESS_TOKEN=<your personal access token here>
```
7. Upload your algorithm version to *Motivus Marketplace*:
```sh
$ motivus push
```

Your algorithm is now published on *Motivus Marketplace*.
