const Web3 = require('web3'); // Import Web3.js

// Replace with deployed contract address
const contractAddress = '0x...'; // (Replace with actual address of your MAT token)

// Configure Web3 provider (replace with a real provider)
const provider = new Web3.providers.HttpProvider('http://localhost:8545'); // Replace with your provider URL (e.g., Alchemy, Infura)
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(abi, contractAddress);

// Update token details on page load
window.onload = async () => {
  const name = await contract.methods.name().call();
  const symbol = await contract.methods.symbol().call();
  const totalSupply = await contract.methods.totalSupply().call();
  document.getElementById('tokenName').textContent = name;
  document.getElementById('tokenSymbol').textContent = symbol;
  document.getElementById('totalSupply').textContent = web3.utils.fromWei(totalSupply, 'ether'); // Convert Wei to Ether
};

// Get My MAT Balance button click handler
document.getElementById('getBalance').addEventListener('click', async () => {
    const accounts = await web3.eth.getAccounts();

    if (!accounts.length) {
        alert('Please connect your Ethereum wallet (MetaMask, etc.)');
        return;
    }

    const address = accounts[0]; // Use the first connected account

    try {
        const balance = await contract.methods.balanceOf(address).call();
        const formattedBalance = web3.utils.fromWei(balance, 'ether');
        document.getElementById('balanceOutput').textContent = `Your MAT Balance: ${formattedBalance} MAT`;
    } catch (error) {
        console.error('Error fetching balance:', error);
        alert('An error occurred while fetching your balance. Please check the console for details.');
    }
});

// Simulate Minting (cannot directly mint without a deployed contract)
document.getElementById('mintButton').addEventListener('
