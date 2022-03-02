# What is Motivus?
Motivus is an ecosystem for distributed computing that enables people and companies from all around the world to combine their computing power to solve real world problems.

You can execute tasks on *Motivus Waterbear Cluster* using a driver program, that describes the task to be distributed to the workers and handles the results.

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

motivus = await Client.connect()

task_id = conn.call_async(task_definition)
task = conn.select_task(task_id)
result = await task

print(result)
```

3. Run your driver: 
```sh
$ python driver.py
```

## Task definition
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


## Steps

1. Create a `motivus.yml` file, declaring some metadata of your algorithm for the framework to use.
```yaml
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
      upstream_url: "https://github.com/m0tivus/kmeans-rust"
      long_description: "k-means clustering is a method of vector quantization, originally from signal ..."
```
# Compiling

## C/C++ Compilation

## Requirements
- Docker
- Python = 3.7, 3.8, 3.9
- [Motivus CLI and Motivus Client library](https://pypi.org/project/motivus/):
```sh
$ pip install motivus
```
### Compilation steps
- Make sure the program spqr source code is present (or clone using `git clone --recurse-submodules`)
- Extract `filesystem/interactions/intrac.btb.zip` contents. This is a file required to be present for any execution of the program and is handled specially.
```sh
$ cd filesystem/interactions && unzip intrac.btb.zip
``c
c Start compilation and packaging of the algorithm
```sh
$ motivus build
```
Tip: When the flag `--dev` is set, `stdout` and `stderr` will print to worker console instead of a log file.
- Package is then created in `build` directory

**Important**: when making changes to `filesystem/` the `.data.zip` link used in the driver should also be updated. 

## Running the algorithm
### Running steps
#### Testing in local environment
- Start a loop-back worker for local task execution:
```sh
$ motivus loopback
```
- Set the environment value to point the driver execution to the loop-back server
```sh
export WEBSOCKET_URI=ws://localhost:7070/client_socket/websocket
```
- Run the driver
`python driver.py`
- All tasks are sent to the worker for processing.
- The result files are stored in `mMC_output` directory.

#### Running on Motivus cluster
You will need a valid `application_token` to run tasks on Motivus cluster.
- Make the following environment variables available in current session
```sh
export WEBSOCKET_URI=wss://waterbear.api.motivus.cl/client_socket/websocket
export APPLICATION_TOKEN=<your application token>
```
- Run the driver
`python driver.py`
- All tasks are sent to the Motivus cluster available workers for processing.
- The result files are stored in `mMC_output` directory.

# Using as a template for other C/C++ projects
Several files are relevant:
- `Makefile` describes all the compilation and packaging steps:
    - It is based on the program source's `Makefile.in`
        - Uses the emscripten compiler with a JS/WASM output target.
            - Bundles all files into one compressed archive for marketplace publishing.
            - `waterbear.emscripten.js` is the *glue* code that communicates Motivus and the emscripten module.
            - `webpack.config.js` handles the transformation of the worker code for web and node environments.
            - `package.json` lists dependencies for webpack bundler.
            - `motivus.yml` is a configuration file that describes metadata for building, packaging and publishing algorithms.
            - `filesystem/` refers to the files available during execution on a worker's virtual file system: It is required that contains at least one file.



# Publishing
# Running


# Try Motivus
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Pellentesque eu ultrices nisi. Phasellus sed tristique est, 
non pharetra felis. Nunc posuere a eros nec cursus. 
Proin rutrum massa pharetra, convallis lorem ut, 
faucibus leo. Donec quis molestie ante. 
## Playing Areas
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Pellentesque eu ultrices nisi. Phasellus sed tristique est, 
non pharetra felis. Nunc posuere a eros nec cursus. 
Proin rutrum massa pharetra. "Hello world" codepen, sandbox or Stackblitz
## Create a new Aplication  
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Pellentesque eu ultrices nisi. Phasellus sed tristique est, 
non pharetra felis. Nunc posuere a eros nec cursus. 
Proin rutrum massa pharetra. "Hello world" [codepen](https://codepen.io/), [Figma](https://figma.com/).    

***
# Learn Motivus
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Pellentesque eu ultrices nisi. *Phasellus sed tristique* est, 
non pharetra felis. Nunc posuere a eros nec cursus. Proin 
rutrum massa pharetra, convallis lorem ut, faucibus leo. 
**Donec quis molestie ante**. 

* Lorem ipsum dolor sit amet, consectetur adipiscing elit. _Pellentesque **eu ultrices** nisi_.
* Lorem ipsum dolor sit amet, consectetur adipiscing elit. ~Pellentesque eu ultrices nisi~. 
    * Lists
    * [ ] todo
    * [x] done
1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. _**Pellentesque** eu ultrices nisi_.
1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ~Pellentesque eu ultrices nisi~. 
    1. Lists
    1. [ ] todo
    1. [x] done
## First Example
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Pellentesque eu ultrices nisi. Phasellus sed tristique est, non pharetra felis. Nunc posuere a eros nec cursus. Proin rutrum massa pharetra, convallis 
lorem ut, faucibus leo. Donec quis molestie ante.  


                python
                def Fibonacci(n):
                    if n == 0:
                        return 0
                    elif n == 1 or n == 2:
                        return 1
                    else:
                        return Fibonacci(n-1) + Fibonacci(n-2)
                print(Fibonacci(9))
                
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Pellentesque eu ultrices nisi. Phasellus sed tristique est, 
non pharetra felis. Nunc posuere a eros nec cursus. Proin rutrum massa pharetra, 
convallis lorem ut, faucibus leo. Donec quis molestie ante.
>### Advice 
>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Pellentesque eu ultrices nisi. Phasellus sed tristique est, 
non pharetra felis. Nunc posuere a eros nec cursus. Proin rutrum massa pharetra, 
convallis lorem ut, faucibus leo. Donec quis molestie ante.

***

# Contet Table:

| a | b | c | d | f | g |
| - | - | - | - | - | - |
| asda | asdasd | asdas | asdasd | aasdasd | adasd |
