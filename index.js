
const contractAddress = "0xf223609c70bA25e7bb286f008a50f934ee7B8A4A";
let abi;
let abiAbz;
const loadJson = async () => {
    abi = await (await fetch("./abiNft.json")).json()
    abiAbz = await (await fetch("./abiFt.json")).json()
}
loadJson()
const abzAddress = "0x7f3e9bdb55a0fa72bd6025c0ee1dfc3276ce3cf9"
const connectToContract = async () => {
    try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const selectedAddress = accounts[0];
        const contract = new web3.eth.Contract(abi, contractAddress);
        const contractOwner = await contract.methods.owner().call();
        console.log(contractOwner)
        if (contractOwner === selectedAddress) {
            console.log("You are contract owner");
        } else {
            console.log("You are not the contract owner");
        }
    } catch (error) {
        console.log(error);
    }
};

const getTokenUri = async (tokenId) => {
    try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const selectedAddress = accounts[0];
        const contract = new web3.eth.Contract(abi, contractAddress);
        const tokenUri = await contract.methods.tokenURI(tokenId).call()
        // console.log(tokenUri)
        let stringMetaData = atob(tokenUri.slice(29));
        stringMetaData = stringMetaData.replace(/'/g, '"');
        let metaData = JSON.parse(stringMetaData);
        return metaData
    }
    catch (err) {
        console.log(err)
    }
}

const getTokenAttributes = async (tokenId) => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const tokenAttributes = await contract.methods._tokenIdToAttributes(tokenId).call()
    return tokenAttributes
}

const getReward = async (tokenId) => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const rewards = await contract.methods.checkReward(tokenId).call()
    const formattedRewards = web3.utils.fromWei(rewards.toString(), 'ether');

    return parseFloat(formattedRewards).toFixed(3);
}

const getHatchTimeRemaining = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const remainingTime = await contract.methods.hatchRemainingTime(tokenId).call()
    return remainingTime
}

const lockInIncubator = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const lockInIncubator = await contract.methods.lockInIncubator(tokenId).send({
        from: selectedAddress,
        gasLimit: 1000000,
        gasPrice: await web3.eth.getGasPrice(),
    })
    return lockInIncubator
}

const getEggHatch = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const egg = await contract.methods._eggHatch(tokenId).call()
    return egg
}
const hatchEggs = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const egg = await contract.methods.hatchEggs(tokenId).send({
        from: selectedAddress,
        gasLimit: 1000000,
        gasPrice: await web3.eth.getGasPrice(),
    })
    return egg
}

const getLevel = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const level = await contract.methods.level(tokenId).call()
    return level
}

const getAllowance = async () => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const selectedAddress = accounts[0]
    const contract = new web3.eth.Contract(abiAbz, abzAddress)
    const allowance = await contract.methods.allowance(selectedAddress, contractAddress).call()
    return Number(allowance)
}

const getMatureBirdCost = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const cost = await contract.methods.matureBirdCost(tokenId).call()
    return Number(cost)

}
const getMaxMatureBirdCost = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const cost = await contract.methods.maxMatureBirdCost(tokenId).call()
    return Number(cost)
}
const approveAbz = async (cost) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const selectedAddress = accounts[0]
    const contract = new web3.eth.Contract(abiAbz, abzAddress)
    const balance = await contract.methods.balanceOf(selectedAddress).call()
    if (Number(balance) >= Number(cost)) {
        const txn = await contract.methods.approve(contractAddress, cost).send({
            from: selectedAddress,
            gasLimit: 1000000,
            gasPrice: await web3.eth.getGasPrice(),
        })
        return txn
    }

}
const balanceOfAbz = async () => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const selectedAddress = accounts[0]
    const contract = new web3.eth.Contract(abiAbz, abzAddress)
    const balance = await contract.methods.balanceOf(selectedAddress).call()
    return Number(balance)
}
const upgradeToMatureBird = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const txn = await contract.methods.upgradeToMatureBird(tokenId).send({
        from: selectedAddress,
        gasLimit: 1000000,
        gasPrice: await web3.eth.getGasPrice(),
    })
    return txn
}
const upgradeToMaxMatureBird = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const txn = await contract.methods.upgradeToMaxMatureBird(tokenId).send({
        from: selectedAddress,
        gasLimit: 1000000,
        gasPrice: await web3.eth.getGasPrice(),
    })
    return txn
}

const getNFTs = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];

    // Get the NFTs from the user's wallet
    const userNFTs = await getNFTsFromWallet(selectedAddress);

    return userNFTs;
};

const getNFTsFromWallet = async (walletAddress) => {
    // Get the list of NFTs owned by the wallet
    const NFTs = await axios.get(
        `https://deep-index.moralis.io/api/v2/${walletAddress}/nft?chain=bsc&format=decimal&token_addresses%5B0%5D=0xf223609c70bA25e7bb286f008a50f934ee7B8A4A`,
        { headers: { 'X-API-Key': "0D1yPrfVMgJsqXaqHHfz31Zh4JZq0y2bbv6m5ALiapsiSIO4PAZlQczYOvZjJ4HX", 'accept': 'application/json' } }
    );

    return NFTs?.data?.result;
};

const transferOwnership = async (address, tokenId) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const txn = await contract.methods.safeTransferFrom(selectedAddress, address, tokenId).send({
        from: selectedAddress,
        gasLimit: 1000000,
        gasPrice: await web3.eth.getGasPrice(),
    })
    return txn
}
const getRarity = async (tokenId) => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const selectedAddress = accounts[0];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const rarity = await contract.methods.getRarity(tokenId).call();
    return rarity;
};
const claimReward = async (tokenId) => {
    try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const selectedAddress = accounts[0];
        const contract = new web3.eth.Contract(abi, contractAddress);
        const txn = await contract.methods.withdrawReward(tokenId).send({
            from: selectedAddress,
            gasLimit: 1000000,
            gasPrice: await web3.eth.getGasPrice(),
        })
        // Refresh the page after successful transaction
        location.reload();

        return txn;
    } catch (error) {
        console.log(error);
        alert("Error claiming reward: " + error.message);
    }
};
