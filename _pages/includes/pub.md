
<style>
        /* 自定义水平线 */
        .custom-hr1 {
            border: none;
            height: 1px;
            background-color: #ccc;
            margin: 20px 0;
        }

        /* 论文项布局：替代float，避免错位 */
        .publication-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 40px;
        }

        /* 图片容器：基础样式 */
        .img-container {
            position: relative;
            margin-right: 30px;
            /* 基础展示尺寸（可调整），不固定宽高比 */
            width: 200px;
            height: 180px;
            cursor: pointer;
        }

        /* 核心：适配不同比例图片，完整显示不裁剪 */
        .custom-size {
            width: 100%;
            height: 100%;
            object-fit: contain; /* 替换cover，完整显示图片，留白不裁剪 */
            background-color: #f5f5f5; /* 留白处背景，更美观 */
            transition: transform 0.4s ease-in-out; /* 更顺滑的过渡 */
        }

        /* 悬停放大：调大倍数（1.8倍，可自定义） */
        .img-container:hover .custom-size {
            transform: scale(1.8); /* 放大倍数提升，可改2.0=2倍 */
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2); /* 增强阴影，突出放大效果 */
        }

        /* 论文标题样式 */
        .publication-title {
            color: #0066cc;
            text-decoration: none;
        }
        .publication-title:hover {
            text-decoration: underline;
        }

        /* 全屏查看遮罩层：默认隐藏 */
        .fullscreen-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: zoom-out; /* 提示可关闭 */
        }

        /* 全屏图片样式：自适应屏幕，保持比例 */
        .fullscreen-img {
            max-width: 90vw;
            max-height: 90vh;
            object-fit: contain;
        }
    </style>


# 📝 Publications 
&dagger;: equal contribution, * : corresponding author

##  🖼️ Super-resolution

<hr class="custom-hr1">


<dl>
    <dt>
        <div class="img-container">        
            <img class="custom-size" src="./_pages/images/MLMC.png" alt="MLMC" style="margin-right: 30px;">
        </div>
    </dt>
</dl>

<strong><a class="publication-title">Blind super-resolution via meta-learning and Markov chain Monte Carlo simulation</a></strong> <br>
Jingyuan Xia<sup>†</sup>, <strong>Zhixiong Yang</strong><sup>†,*</sup>, Shengxi Li, Shuanghui Zhang, Yaowen Fu, Deniz Gündüz, Xiang Li <br>
IEEE Transactions on Pattern Analysis and Machine Intelligence  <strong>(Trans.PAMI)</strong>, 2024 (<span style="color:red">*Highly Cited Paper/Hot Paper*</span>) <br>
[[Paper](https://arxiv.org/pdf/2406.08896)], [[Codes](https://github.com/XYLGroup/MLMC)]
<br><br><br>


<dl>
  <dt>
<div class="img-container">  <img align="left" width="200" height="150" class="custom-size" src="./_pages/images/DKP.png" alt="DKP" style="margin-right: 30px;">
</div>
</dt>
</dl>

<strong><a class="publication-title">A dynamic kernel prior model for unsupervised blind image super-resolution</a></strong> <br>
<strong>Zhixiong Yang</strong><sup>†</sup>, Jingyuan Xia<sup>†,*</sup>, Shengxi Li, Xinghua Huang, Shuanghui Zhang, Zhen Liu, Yaowen Fu, Yongxiang Liu <br>
IEEE/CVF Conference on Computer Vision and Pattern Recognition  <strong>(CVPR)</strong>, 2024 <br>
[[Paper](https://openaccess.thecvf.com/content/CVPR2024/papers/Yang_A_Dynamic_Kernel_Prior_Model_for_Unsupervised_Blind_Image_Super-Resolution_CVPR_2024_paper.pdf)], [[Codes](https://github.com/XYLGroup/DKP)]
<br><br>

<dl>
  <dt><img align="left" width="200" height="150" class="custom-size" src="./_pages/images/DDSR.png" alt="DDSR" style="margin-right: 30px;"></dt>
</dl>

<strong><a class="publication-title">Meta-learning based blind image super-resolution approach to different degradations</a></strong> <br>
<strong>Zhixiong Yang</strong>, Jingyuan Xia<sup>*</sup>, Shengxi Li, Wende Liu, Shuaifeng Zhi, Shuanghui Zhang, Li Liu, Yaowen Fu, Deniz Gündüz <br>
Elsevier Neural Networks <strong>(NN)</strong>, 2024 <br>
[[Paper](https://www.sciencedirect.com/science/article/pii/S0893608024003538)], [[Codes](https://github.com/XYLGroup/DDSR)]
<br><br>

- `IEEE GRSL` <strong><a class="publication-title">SAKE: Unsupervised HSI Super-Resolution via Adaptive Kernel Estimation and Reconstruction</a></strong>, 
Lingyu Zheng<sup>†</sup>, <strong>Zhixiong Yang</strong><sup>†</sup>, Tong Qiu, and Jingyuan Xia<sup>*</sup>, IEEE Geoscience and Remote Sensing Letters, 2025.
[[Paper](https://ieeexplore.ieee.org/abstract/document/11005589)] [[Codes](https://github.com/XYLGroup/SAKE)]




## 📡 ISAR Imaging 

<hr class="custom-hr1">
<dl>
  <dt><img align="left" width="200" height="150" class="custom-size" src="./_pages/images/LAOF.png" alt="Radar" style="margin-right: 30px;"></dt>
</dl>

<strong><a class="publication-title">A Learning-aided Plug-and-play Method for Sparse Aperture ISAR Imaging and Autofocusing</a></strong> <br>
<strong>Zhixiong Yang</strong>, Jingyuan Xia<sup>*</sup>, Shuanghui Zhang, Li Liu, Yaowen Fu, Yongxiang Liu<br>
IEEE Transactions on Aerospace and Electronic Systems  <strong>(Trans.AES)</strong>, 2025<br>
[[Paper](https://ieeexplore.ieee.org/document/11202588)], [[Codes](https://github.com/XYLGroup/LABP)]
<br><br><br>


<dl>
  <dt><img align="left" width="200" height="150" class="custom-size" src="./_pages/images/Radar1.png" alt="Radar" style="margin-right: 30px;"></dt>
</dl>

<strong><a class="publication-title">A metalearning-based sparse aperture ISAR imaging method</a></strong> <br>
Jingyuan Xia, <strong>Zhixiong Yang<sup>*</sup></strong>, Zhixing Zhou, Huaizhang Liao, Shuanghui Zhang, Yaowen Fu <br>
Journal of Radars  <strong>(雷达学报)</strong>, 2023 <br>
[[Paper](https://radars.ac.cn/en/article/doi/10.12000/JR23121)], [[Codes](https://github.com/XYLGroup/LABP)]
<br><br><br>

## 📶 MIMO Beamforming

<hr class="custom-hr1">
<dl>
  <dt><img align="left" width="200" height="150" class="custom-size" src="./_pages/images/LAGD.png" alt="LAGD" style="margin-right: 30px;"></dt>
</dl>

<strong><a class="publication-title">A learning-aided flexible gradient descent approach to MISO beamforming</a></strong> <br>
<strong>Zhixiong Yang</strong>, Jing-Yuan Xia<sup>*</sup>, Junshan Luo, Shuanghui Zhang, Deniz Gündüz <br>
IEEE Wireless Communications Letters  <strong>(IEEE WCL)</strong>, 2022 <br>
[[Paper](https://drive.google.com/file/d/1jc84B9e_aexTxjCQt2TZs2DWtBRANhYT/view)], [[Codes](https://github.com/XYLGroup/LAGD)]
<br><br>

## ⌛️ In Submission & Preprint

<hr class="custom-hr1">
<dl>
  <dt><img align="left" width="200" height="150" src="./_pages/images/BKSR.png" alt="BKSR" style="margin-right: 30px;"></dt>
</dl>


<strong><a class="publication-title">BKSR: Band-kernel Stochastic Learning for Unsupervised Blind Hyperspectral Image Super-Resolution</a></strong> <br>
Under Review <br>
Paper and Codes will be released after accept.
<br><br><br>

<dl>
  <dt><img align="left" width="200" height="150" src="./_pages/images/EMSD.png" alt="EMSD" style="margin-right: 30px;"></dt>
</dl>

<strong><a class="publication-title">Error-Robust Unsupervised Shadow Removal via Luminance Probability Learning under Mask Misalignment</a></strong> <br>
Under Review <br>
Paper and Codes will be released after accept.
<br><br><br>


 
<style>
  .custom-hr1 {
    border: 1px solid grey; /* 增加边框的粗细 */
    height: 0px;  /* 确保横线的高度不为0 */
    color: black;
  }
</style>
