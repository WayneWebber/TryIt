快來讀我
=======
    
    本章目前還是草稿，內容有任何需要補充或修正的地方請找 Wayne 。
    
![Alt text](https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-prn1/t1.0-9/1001968_884251171601050_3941224734896834644_n.jpg "鳩咪")








參考資料
========

[MD檔的語法](https://github.com/emn178/markdown)



    此安裝法適用於ubuntu

安裝 NVM 來管理你的 Nodejs
=========================

## Install script

要安裝使用 curl [install script](https://github.com/creationix/nvm/blob/v0.4.0/install.sh):

    curl https://raw.github.com/creationix/nvm/v0.4.0/install.sh | sh

或是 Wget:

    wget -qO- https://raw.github.com/creationix/nvm/v0.4.0/install.sh | sh

檔案會存在 `~/.nvm` 新增命令列到你的 `.bashrc` :

    ```sh
    # set PATH so it includes user's private bin if it exists
    if [ -d "$HOME/.nvm/bin" ] ; then
      export PATH="$HOME/.nvm/bin:$PATH"
      export NVM_DIR="$HOME/.nvm"
    fi

    [ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"
    ```
