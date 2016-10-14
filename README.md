<img src="http://tinyurl.com/jha2dhd" height="100" width="65">
<p align="center">
  <h2 align="center">DonorHome- For android and ios platform</h2>
  <h3>Platforms IOS 7.0 and above and Android Jelly Bean (API level 16) and above</h3>
</p>


#Important Information for setting up the project in your local machine
#after cloning the project, cd donorhome

1. Xcode
2. Node.js <br/>
 brew update <br />
 brew install node <br />
 brew upgrade node  (for upgrading node) <br />
3. brew install watchman

4. npm install -g react-native-cli <br />

5. Running on android Guidelines -> comming soon

Temporary Backend used: Firebase

 6.npm install firebase --save
Also 
 7.npm install react-native-side-menu --save
 
Other Issues: might be an issue with new macOS

Solution: Solution for the Issues with new macOS upgrade ->
Go to: Project->node_modules->React->Views->RCTScoolView.m

- (void)setRefreshControl:(RCTRefreshControl *)refreshControl
{ <br />
  if (refreshControl) { <br />
    [refreshControl removeFromSuperview]; <br/>
  } <br/>
  refreshControl = refreshControl; <br/>
  [self addSubview:refreshControl]; <br/>
} <br/>

Suggestion : Use DECO!

<br />
<h3>If Not Using Deco</h3>
In the donorHome Directory do npm start <br />
Go to:  donorhome-> ios <br />
Double click donorhome.xcodeproj <br />
The app will run on xcode <br />
Then press the play button on the upper left corner



