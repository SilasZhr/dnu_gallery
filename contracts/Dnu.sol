pragma solidity 0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract Dnu is ERC721,Ownable,AccessControl {
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");

    uint256 public tokenCounter;
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        tokenCounter = 0;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function addMembers(address[] memory members) public onlyOwner{
        for (uint256 i = 0; i < members.length; ++i) {
            _setupRole(MEMBER_ROLE, members[i]);
        }
    }

    function checkMembers(address member) public view returns(bool){
        return hasRole(MEMBER_ROLE,member);
    }

    function mintZero(string memory tokenURI) public onlyOwner{
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);

        tokenCounter++;
    }

    function mint(string memory tokenURI) public onlyRole(MEMBER_ROLE){
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);

        tokenCounter++;
    }

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        ); // Checks if the tokenId exists
        _tokenURIs[_tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        return _tokenURIs[tokenId];
    }
}
