
安裝 NVM 來管理你的 Nodejs
=========================

    此安裝法適用於ubuntu

![Build Status](/ImWeber/TechnicalDocumentation/img/logo.png)


## Install script

要安裝使用 curl [install script](https://github.com/creationix/nvm/blob/v0.4.0/install.sh):

    curl https://raw.github.com/creationix/nvm/v0.4.0/install.sh | sh

或是 Wget:

    wget -qO- https://raw.github.com/creationix/nvm/v0.4.0/install.sh | sh

檔案會存在 `~/.nvm`

然後請新增以下命令列到 `.bashrc` 的最後面:

```bash

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.nvm/bin" ] ; then
  export PATH="$HOME/.nvm/bin:$PATH"
  export NVM_DIR="$HOME/.nvm"
fi
[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"

```

## Usage

下載打包好的套件:

```bash
$ nvm install v0.10.26
```

或自行編譯:

```bash
$ nvm install -s v0.10.26
```

設置node默認版本，請使用`default`：

```bash
$ nvm alias default v0.10.26
```

切換使用的node版本

```bash
$ nvm use v0.11.12
or
$ nvm use default
```

運行指令檢查所有`node`版本:

```bash
$ nvm ls
```

運行指令檢查本機安裝的`node`版本:

```bash
$ nvm ls-remote
```

參考網址
========
